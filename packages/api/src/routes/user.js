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
          req.session.regenerate(() => {
            // eslint-disable-next-line no-console
            console.log(`Logging in...`);
            res.redirect(`/dashboard`);
          });
        }

        else {
          // eslint-disable-next-line no-console
          console.log(`no match`);
          response.redirect(`/login`);
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.log(err);
      });

      ResponseHandler(
        res,
        `Successfully logged in`,
        { username },
      );
    } catch (err) {
      next(err);
    }
  },

);

module.exports = { userRouter };
