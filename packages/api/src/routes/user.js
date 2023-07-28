const { Router } = require(`express`);
const { ResponseHandler } = require(`../utils`);
const { UserService } = require(`../microservices`);
const bcrypt = require(`bcrypt`);

const userRouter = Router();

userRouter.post(
  `/login`,

  async (req, res, next) => {
    try {
      const { username } = req.body.credentials;

      const foundUser = await UserService.login(username);

      bcrypt.compare(req.body.credentials.password, foundUser.password, (err, response) => {
        if (response) {
          // eslint-disable-next-line no-console
          console.log(`Logging in...`);

          const user = {
            firstName: foundUser.firstName,
            is_supervisor: foundUser.is_supervisor,
            lastName: foundUser.lastName,
            username: foundUser.username,
          };
          const token = `test`;
          ResponseHandler(
            res,
            `Successfully logged in`,
            // eslint-disable-next-line sort-keys
            { user, token },
          );
        }

        else {
          // eslint-disable-next-line no-console
          console.log(`Passwords don't match`);
          response.redirect(`/login`);
        }
      });

    } catch (err) {
      next(err);
    }
  },

);

module.exports = { userRouter };
