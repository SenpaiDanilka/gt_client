import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.eu.fauna.com/graphql": {
      headers: {
        //NOT WORKING
        //Authorization: `Bearer ${process.env.REACT_APP_PUBLIC_FAUNA_SECRET}`
        //OLD
        //Authorization: "Bearer fnAExKx3I6AA0dcGlAW-sy6YSeWkTdmFVHaySXxv"
        Authorization: "Bearer fnAE2VPpMMAA0MIqMklHExQcV9Wq0P8sP0fgX2MR"
      }
    }
  },
  documents: [
    "src/**/*.{ts,tsx}",
    "!src/generated/*.ts"
  ],
  generates: {
    "src/generated/types.ts": {
      plugins: ["typescript"]
    },
    "src/generated/operations.ts": {
      plugins: ["typescript-operations"]
    },
    "src/generated/apollo-functions.ts": {
      plugins: ["typescript-react-apollo"]
    }
  }
}

export default config;

