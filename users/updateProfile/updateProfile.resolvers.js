import client from "../../client";

export default {
  Mutation: {
    updateProfile: async (_, { username }, { loggedInUser }) => {
      try {
        const updateUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
          },
        });
        if (username === loggedInUser.username && updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "프로필 업데이트에 실패하였습니다.",
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: "프로필 업데이트에 실패하였습니다.",
        };
      }
    },
  },
};
