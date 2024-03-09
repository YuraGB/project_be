export default {
  body: {
    type: "object",
    required: [
      "email",
      "password",
      "name",
      "dateOfBirth",
      "phoneNumber",
      "agreement",
    ],
    properties: {
      email: { type: "string" },
      password: { type: "string" },
      name: { type: "string" },
      dateOfBirth: { type: "string" },
      phoneNumber: { type: "string" },
      agreement: { type: "boolean" },
    },
  },
};
