import UserModel from "../models/user-model.js";
import {
  ErrorHandlerService,
  deleteFile,
  sendMail,
} from "../services/index.js";
import Jimp from "jimp";
import {
  forgetPasswordValidationSchema,
  loginValidationSchema,
} from "../services/validation-service.js";
import bcrypt from "bcrypt";
import { ROOT_PATH } from "../server.js";

class AuthController {
  async login(req, res, next) {
    const { email, password } = req.body;
    /* REQUEST VALIDATION */
    const { error } = loginValidationSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    /* CHECK USER EXIST OR NOT */
    let user;
    try {
      user = await UserModel.findOne({ email })
        .populate("batch")
        .populate("departement");
      if (!user) {
        return next(
          ErrorHandlerService.wrongCredentials("User does not exist with that email.")
        );
      }
    } catch (error) {
      next(error);
    }
    /* COMPARE PASSWORD WITH STORED HASHED PASSWORD */
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(ErrorHandlerService.wrongCredentials("Invalid password."));
    }

    return res.status(200).json({ isAuth: true, user: user });
  }

  async changePassword(req, res, next) {
    const { currentPassword, newPassword } = req.body;
    /* REQUEST VALIDATION */
    if (!currentPassword || !newPassword) {
      return next(ErrorHandlerService.validationError());
    }

    try {
      /* CHECK IF USER EXISTS */
      const user = await UserModel.findOne({ _id: req.userData._id });
      if (!user) {
        return next(ErrorHandlerService.notFound());
      }
      /* CONFIRM CURRENT PASSWORD */
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return next(
          ErrorHandlerService.wrongCredentials("Current password is wrong!")
        );
      }
      /* HASH NEW PASSWORD BEFORE SAVING TO DB */
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

      return res.status(200).json({ msg: "Password Changed Successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async forgetPassword(req, res, next) {
    const { email } = req.body;
    /* VALIDATE REQUEST */
    const { error } = forgetPasswordValidationSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    try {
      /* CHECK IF EMAIL IS VALID AND USER EXISTS */
      const user = await UserModel.findOne({ email });
      if (!user) {
        return next(ErrorHandlerService.notFound("Email does not exist"));
      }
      /* GENERATE PASSWORD RESET TOKEN */
      const resetToken = /* Generate or assign a unique token */;

      /* STORE PASSWORD RESET TOKEN INTO DB */
      user.resetToken = resetToken;
      await user.save();

      // Send email
      await sendMail({
        to: user.email,
        from: "sriramgandrothu@gmail.com",
        subject: "ECE Resource Hub Password Reset Link",
        text: `Hello ${user.name}! Your password reset link is http://localhost:5173/new-password/${resetToken}/. Click on the link to change your password.`,
      });
      return res.status(200).json({ msg: "Email sent." });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    const { newPassword, token } = req.body;
    /* REQUEST VALIDATION */
    if (!newPassword || !token) {
      return next(ErrorHandlerService.validationError());
    }
    /* CHECK IF TOKEN IS VALID */
    let userData;
    try {
      userData = /* Verify the token */;
    } catch (error) {
      return next(
        ErrorHandlerService.badRequest("Password reset token expired!")
      );
    }

    try {
      /* VALIDATE USER IN DB */
      const user = await UserModel.findOne({
        _id: userData._id,
        resetToken: token,
      });

      if (!user) {
        return next(ErrorHandlerService.badRequest("User not found!"));
      }

      /* HASH PASSWORD BEFORE SAVING TO DB */
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;

      await user.save();
      return res.status(200).json({ msg: "Password reset successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    res.json({
      user: null,
      isAuth: false,
    });
  }

  async updateProfileImage(req, res, next) {
    const { avatar } = req.body;
    if (!avatar) {
      return next(ErrorHandlerService.validationError("Avatar required!"));
    }
    try {
      const buffer = Buffer.from(
        avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );
      const imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;

      const jimResp = await Jimp.read(buffer);
      jimResp.resize(250, Jimp.AUTO).write(`${ROOT_PATH}/uploads/${imagePath}`);

      const user = await UserModel.findById(req.userData._id);
      if (!user) {
        return next(ErrorHandlerService.notFound("User not found!"));
      }
      if (user.imagePath) {
        deleteFile(`${user.imagePath}`);
      }
      user.imagePath = `uploads/${imagePath}`;
      await user.save();
      return res.status(200).json({ user, isAuth: true });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getUserDetails(req, res, next) {
    const userId = req.query.userId;
    try {
      const user = await UserModel.findOne({ _id: userId })
        .populate("batch")
        .populate("departement");
      if (!user) {
        return next(ErrorHandlerService.notFound("User not found"));
      }
      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
