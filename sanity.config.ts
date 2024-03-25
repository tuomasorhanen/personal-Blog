import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from "./sanity/schemas"

const config = defineConfig({
  projectId: "",
  dataset: "production",
  title: "",
  apiVersion: "2023-03-09",
  basePath: "/admin",
  useCdn: false,
  plugins: [deskTool()],
  schema: { types: schemas }
})

export default config
