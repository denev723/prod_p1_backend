import client from "../../client";
import bcrypt from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { username, password }) => {
      try {
        const checkedUser = await client.user.findFirst({
          where: {
            username,
          },
        });
        if (checkedUser) {
          return {
            ok: false,
            error: "해당 ID는 이미 등록이 되어있습니다.",
          };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
          data: {
            username,
            password: hashedPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "계정 생성에 실패하였습니다.",
        };
      }
    },
  },
};
