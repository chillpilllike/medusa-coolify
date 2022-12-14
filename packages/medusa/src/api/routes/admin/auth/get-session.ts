import UserService from "../../../../services/user"
import _ from "lodash"

/**
 * @oas [get] /auth
 * operationId: "GetAuth"
 * summary: "Get Session"
 * x-authenticated: true
 * description: "Gets the currently logged in User."
 * tags:
 *   - Auth
 * responses:
 *  "200":
 *    description: OK
 *    content:
 *      application/json:
 *        schema:
 *          properties:
 *            user:
 *              $ref: "#/components/schemas/user"
 *  "400":
 *    description: An error occurred.
 */
export default async (req, res) => {
  try {
    const userService: UserService = req.scope.resolve("userService")
    const user = await userService.retrieve(req.user.userId)

    const cleanRes = _.omit(user, ["password_hash"])
    res.status(200).json({ user: cleanRes })
  } catch (err) {
    res.sendStatus(400)
  }
}
