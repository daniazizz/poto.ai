module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@components": "./app/components",
            "@screens": "./app/screens",
            "@contexts": "./app/contexts",
            "@services": "./app/services",
            "@~types": "./app/types",
            "@app": "./app",
            "@root": "./",
          },
        },
      ],
    ],
  };
};
