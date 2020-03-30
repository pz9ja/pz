// const path = require("path");
const withFonts = require("next-fonts");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");
const path = require("path");
//

// const withPlugins = require("next-compose-plugins");

// const dev = process.env.NODE_ENV !== "production";
//

module.exports = withFonts(
  withCSS(
    withSass({
      publicRuntimeConfig: {
        API_URL: process.env.API_URL
      },
      env: {
        API_URL: process.API_URL
      },
      webpack(config, options) {
        (config.resolve.alias["~"] = path.resolve(__dirname)),
          config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|otf|ttf|woff|woff2)$/,
            use: {
              loader: "url-loader",
              options: {
                limit: 100000
              }
            }
          });

        return config;
      }
    })
  )
);
