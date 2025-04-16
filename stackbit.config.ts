import { defineStackbitConfig, SiteMapEntry, SiteMapParams } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Page",
          type: "page",
          urlPath: "/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true }
            // Add more fields as needed
          ]
        }
      ],
    })
  ],
  siteMap: ({ documents }: SiteMapParams) => {
    return documents
      .filter((doc: any) => doc.modelName === "Page")
      .map((doc: any) => ({
        stableId: doc.id,
        urlPath: `/${doc.slug}`,
        document: doc,
        isHomePage: doc.slug === "index"
      })) as SiteMapEntry[];
  }
});
