const Generator = require("yeoman-generator");
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');
const glob = require('glob');
const path = require('path');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}

	prompting () {

		const grettingMsg = `Welcome to use ${ chalk.black.bold.bgWhite('generator-vue-starter-webapp') } generator`;
		this.log(yosay(grettingMsg));

		return this.prompt([{
			type: "input",
			name: "folderName",
			message: "Your folder name",
			default: "custom-component"
		}, {
			type: "input",
			name: "componentName",
			message: "Your component name",
			default: "custom-component"
		}, {
			type: "input",
			name: "version",
			message: "Your component version",
			default: "0.0.1"
		}, {
			type: "input",
			name: "description",
			message: "Your component description",
			default: ''
		}, {
			type: "input",
			name: "author",
			message: "The author name",
			default: ''
		}]).then(props => {
			this.props = props;
		})
	}

	writing() {

		const folderName = this.props.folderName;	// 文件夹名称
		const projectName = changeCase.paramCase(this.props.componentName);		// 项目名称
		const author = changeCase.pascalCase(this.props.author);
		const version = this.props.version;
		const desc = changeCase.pascalCase(this.props.description);
		const componentName = changeCase.pascalCase(this.props.componentName);	// 组件名

		this.fs.copyTpl(
	      	glob.sync(this.templatePath('**'), { dot: true }),
			this.destinationPath(folderName),
			{
				projectName,
				author,
				version,
				desc,
				componentName
			}
		);

		this.log(this.destinationRoot())

		this.fs.copyTpl(
			this.templatePath("src/components/NewComponent.vue"), 
			this.destinationPath(path.join(folderName, `/src/components/${ componentName }.vue`)),
			{ projectName: projectName }
		)

		this.fs.delete(path.join(folderName, `/src/components/NewComponent.vue`))
	}
};