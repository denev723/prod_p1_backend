import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const checkedUser = await client.user.findFirst({
        where: {
          username,
        },
      });
      if (!checkedUser) {
        return {
          ok: false,
          error: "해당 ID/Password를 가진 유저를 찾을 수 없습니다.",
        };
      }
      const verifiedPassword = await bcrypt.compare(
        password,
        checkedUser.password
      );
      if (!verifiedPassword) {
        return {
          ok: false,
          error: "해당 ID/Password를 가진 유저를 찾을 수 없습니다.",
        };
      }
      const token = await jwt.sign(
        { id: checkedUser.id },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
