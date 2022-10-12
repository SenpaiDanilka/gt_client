import {CodegenConfig} from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    "https://graphql.eu.fauna.com/graphql": {
      headers: {
        //Authorization: `Bearer ${process.env.REACT_APP_PUBLIC_FAUNA_SECRET}`
        Authorization: "Bearer fnAExKx3I6AA0dcGlAW-sy6YSeWkTdmFVHaySXxv"
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

