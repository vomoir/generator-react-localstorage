import Generator from "yeoman-generator";
import chalk from "chalk";
import yosay from "yosay";

export default class extends Generator {
  initializing() {
    var today = new Date();
    this.log(`It's working! ${today}`);
  }

  welcome() {
    this.log("React localstorage application generator");
  }

  async prompting() {
    let msgText =
      "This generator will scaffold a functioning React project with localstorage support for you.\n\n";
    msgText +=
      "It will create a new folder with the name you specify, and populate it with the necessary files.\n";
    msgText += "It will also optionally install the necessary dependencies.";
    this.log(
      yosay(
        chalk.red.bold(
          "Welcome to the React Localstorage Project generator!\n\n"
        ) + chalk.whiteBright(msgText)
      )
    );

    this.answers = await this.prompt([
      {
        type: "input",
        name: "fullReactLocalstorageAppName",
        message: "Your React Localstorage app name:",
        default: this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "input",
        name: "appTitle",
        message:
          "What is the title of your app? (will appear in headings etc):",
        default: this.fullReactLocalstorageAppName
          ? this.answers.fullReactLocalstorageAppName
          : this.appname, // Default to current folder name
        store: true,
      },
      {
        type: "confirm",
        name: "srcDir",
        message: "Use a 'src' folder?",
        default: false,
        store: true,
      },
      {
        type: "input",
        name: "assetsFolder",
        message: "Folder name for application assets (e.g., images)",
        default: "public", // Default folder name for assets
        store: true,
      },
      {
        type: "confirm",
        name: "includeInstall",
        message: "Install dependencies? (**will take some time**)",
        default: true,
      },
    ]);
  }

  writing() {
    const { fullReactLocalstorageAppName, assetsFolder, srcDir, appTitle } =
      this.answers;

    //  Make sure there's no spaces in application name (and lowercase)
    const nextJsAppName = fullReactLocalstorageAppName
      .replace(/\s+/g, "_")
      .toLowerCase();

    this.log(`Assets folder: ${assetsFolder}`);
    this.destinationRoot(this.destinationPath(nextJsAppName));

    let srcPath = "app";
    if (srcDir) {
      srcPath = "src/app";
    }
    //  Copy files in 'environment' folder that don't need renaming
    this.fs.copyTpl(
      this.templatePath("environment/*"),
      this.destinationPath(""),
      { srcPath: srcPath, appTitle: appTitle }
    );

    //  Copy individual config files that need a '.' prepended to their name
    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/gitignore"),
      this.destinationPath(".gitignore")
    );

    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/editorconfig"),
      this.destinationPath(".editorconfig")
    );

    this.fs.copy(
      this.templatePath("environment/dotconfigfiles/eslintignore"),
      this.destinationPath(".eslintignore")
    );

    this.fs.copy(
      this.templatePath("environment/template_package.json"),
      this.destinationPath("package.json")
    );

    this.log("***copied environment folder");

    this.fs.copyTpl(
      this.templatePath("postcss.config.cjs"),
      this.destinationPath("postcss.config.cjs")
    );

    this.fs.copyTpl(
      this.templatePath("README.md"),
      this.destinationPath("README.md"),
      { nextJsAppName: nextJsAppName }
    );

    // Create the assets/public folder
    this.fs.copy(
      this.templatePath(`${assetsFolder}`),
      this.destinationPath(`${assetsFolder}`)
    );

    //   Copy over the bulk of the application files,
    //   substituting the src/app or /app path depending on the choice and the app's title.
    this.fs.copyTpl(
      this.templatePath("core/**/*"),
      this.answers.srcDir
        ? this.destinationPath(`src/app`)
        : this.destinationPath(`app`),
      { srcPath: srcPath, appTitle: appTitle }
    );

    this.fs.copyTpl(
      this.templatePath("core/*"),
      this.answers.srcDir
        ? this.destinationPath(`src/app`)
        : this.destinationPath(`app`),
      { srcPath: srcPath, appTitle: appTitle }
    );

    // Replace name in package.json with selected project name
    const packageJson = this.fs.readJSON(this.destinationPath("package.json"));
    packageJson.name = "@vomsoft/" + nextJsAppName;
    this.fs.writeJSON(this.destinationPath("package.json"), packageJson);
  }
  //  Initialise the node dependencies
  install() {
    if (this.answers.includeInstall) {
      console.log("Installing dependencies, please wait...");
      this.spawnSync("npm", ["install"]);
    }
  }

  end() {
    this.log("******************************************");
    this.log(`Run the project:`);
    this.log(
      `    cd ${this.answers.fullReactLocalstorageAppName
        .replace(/\s+/g, "_")
        .toLowerCase()}`
    );
    this.log(`then...`);
    this.log(`    'npm run dev'`);
    this.log(`or...`);
    this.log(`    'npm run build'`);

    let srcPath = this.answers.srcDir ? `src/app` : `app`;

    this.log("******************************************");
  }
}
