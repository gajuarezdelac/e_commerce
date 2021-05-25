const userModel = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const sendToken = require('../middlewares/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// Register a user => /api/v1/register
exports.registerUser = catchAsyncError( async (req, res,next) => {

    const {name, email, password} = req.body;
    let user = userModel;

    
    if(req.body.avatar) {
        const result = await await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })    

         user = await userModel.create({
            name, 
            email,
            password,
            avatar: {
                public_id: result.public_id,
                url: result.secure_url
            },
        });
    }else {
         user = await userModel.create({
            name, 
            email,
            password,
            avatar: {
                public_id: 'N/A',
                url: 'https://image.freepik.com/free-vector/businessman-character-avatar-icon-vector-illustration-design_24877-18271.jpg'
            },
        });
    }

   

    sendToken(user,200, res);

})

// Login => /api/v1/login
exports.loginUser = catchAsyncError( async (req, res,next) => {
    
    const {email, password} = req.body;

    // Checks if email and password is entered by user
    if(!email || !password)  return next(new ErrorHandler('Please enter email and password', 400));
    
    // Find user exists
    const user = await userModel.findOne({email}).select('+password')
    if(!user) return next(new ErrorHandler("Invalid email or password", 401))
     
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) return next(new ErrorHandler("Invalid email or password", 401))
  
    const token = user.getJwtToken();

    sendToken(user,200, res);
})

// Forgot Password => /api/v1/password/forgot

exports.forgotPassword = catchAsyncError( async (req, res,next) => {

  const user = await userModel.findOne({email: req.body.email});

  if(!user) {return next(new ErrorHandler("Email not found", 404))}

  
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

    // Create reset password url
//    const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;
const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;
   const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

   try {
     
    await sendEmail({
        email: user.email,
        subject: 'ShopIT Password Recovery',
        message
    })

    res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`
    })

   } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;   

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500))

   }
})

// Reset Password => 
exports.resetPassword = catchAsyncError( async (req, res,next) => {
   
    // Hash url 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')

    console.log(resetPasswordToken);

   const user = await userModel.findOne({
       resetPasswordToken,
       resetPasswordExpire: {$gt: Date.now()}
   })

   console.log(user);
   

   if(!user) return next(new ErrorHandler("Password Rereset Token invalid or been expires", 401))
   if(req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("Password Does not match", 401))
   
   // Setup new password
   user.password = req.body.password;

   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;   

   await user.save();

   sendToken(user,200, res);

})

// Get currently logged is user details
exports.getUserInfo = catchAsyncError( async (req, res,next) => {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
      success: true,
      user
    });

})

// Reset password for user logged
exports.updatePassword = catchAsyncError( async (req, res,next) => {

    const user = await userModel.findById(req.user.id).select('+password'); 

    // Check previous user password
    const isMatch = await user.comparePassword(req.body.oldPassword);
    

    if(!isMatch) return next(new ErrorHandler("Old Password invalid", 401))

    user.password = req.body.password;
    await user.save();

    sendToken(user,200, res);

})

// Update Profile
exports.updateProfile = catchAsyncError( async (req, res,next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    if(req.body.avatar != '') {
        const user = await userModel.findById(req.user.id);
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width: 150,
            crop: 'scale'
        })    

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })

})

// Logout => 
exports.logout = catchAsyncError( async (req, res,next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
       success: true,
       message: "Logged Out"
    });
})

// ADMIN ROUTES => 

exports.getAllUsers = catchAsyncError( async (req, res,next) => {
  
  const users = await userModel.find();
  
  res.status(200).json({
      success: true,
      users
  });

});

exports.getUserDetails = catchAsyncError( async (req, res,next) => {

   const user = await userModel.findById(req.params.id);

   if(!user){ 
       return next(new ErrorHandler("User does not found", 404));
   }

   res.status(200).json({
       success: true,
       user
   })
})


exports.updateUser = catchAsyncError( async (req, res,next) => {
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
        success: true
    })

})

exports.deleteUser = catchAsyncError( async (req, res,next) => {

    const user = await userModel.findById(req.params.id);
 
    if(!user){ 
        return next(new ErrorHandler("User does not found", 404));
    }

    // Remove  avatar from cloudinary -- TODO
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();
 
    res.status(200).json({
        success: true
    })
})


