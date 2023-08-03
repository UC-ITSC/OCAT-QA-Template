const { Router } = require(`express`);
const { ResponseHandler } = require(`../utils`);
const { UserService } = require(`../microservices`);
const bcrypt = require(`bcrypt`);
const generateAccessToken = require(`../utils/GenerateAccessToken`);

const userRouter = Router();

userRouter.post(
  `/login`,

  async (req, res, next) => {
    try {
      const { username } = req.body.credentials;

      const foundUser = await UserService.login(username);

      bcrypt.compare(req.body.credentials.password, foundUser.password, async (err, response) => {
        if (response) {

          const user = {
            firstName: foundUser.firstName,
            is_supervisor: foundUser.is_supervisor,
            lastName: foundUser.lastName,
            username: foundUser.username,
          };
          // eslint-disable-next-line no-console
          console.log(`Logging in...`);

          const token = await generateAccessToken(foundUser);

          ResponseHandler(
            res,
            `Successfully logged in`,
            { accessToken: token, user },
          );
        }

        else {
          // eslint-disable-next-line no-console
          console.log(`Passwords don't match`);
          res.send(`Password or username incorrect`);
        }
      });

    } catch (err) {
      next(err);
    }
  },

);

module.exports = { userRouter };
