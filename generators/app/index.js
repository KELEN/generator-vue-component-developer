const Generator = require("yeoman-generator");
const chalk = require('chalk');
const yosay = require('yosay');
const changeCase = require('change-case');
const glob = require('glob');
const path = require('path');
const beautify = require('gulp-beautify');
const filter = require("gulp-filter");
const filterVue = filter('**/*.js', { restore: true })

module.exports = class extends Generator {


	constructor(args, opts) {
		super(args, opts);
		this.store = {};
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
			name: "projectName",
			message: "Your project name",
			default: "custom-component"
		}, {
			type: "input",
			name: "version",
			message: "Your project version",
			default: "0.0.1"
		}, {
			type: "input",
			name: "description",
			message: "Your project description",
			default: ''
		}, {
			type: "input",
			name: "author",
			message: "The author name",
			default: ''
		}, {
			type: "list",
			name: "componentType",
			message: "Your component type",
			choices: ["normal component", "single directive"]
		}]).then(answer => {
			
			this.store = Object.assign(this.store, answer);

			this._resolveCompType.call(this, answer.componentType);

		})
	}

	_resolveCompType (type) {

		switch(type) {
			case "single directive": 
				this.prompt({
					type: "input",
					name: "extendName",
					message: "vue directive",
					default: "my-directive"
				}).then(name => {
					this.store = Object.assign(this.store, name, { componentType: 2 });
					this._writing();
				})
				break;
			default: 
				// 常规组件
				this.prompt({
					type: "input",
					name: "extendName",
					message: "Your component name",
					default: "myComponent"
				}).then(name => {
					this.store = Object.assign(this.store, name, { componentType: 1 });
					this._writing();
				})
		}
	}

	_writing() {

		// this.log(JSON.stringify(JSON.stringify(this.store)))

		const folderName = this.store.folderName;	// 文件夹名称
		const projectName = changeCase.paramCase(this.store.projectName);		// 项目名称
		const author = changeCase.pascalCase(this.store.author);
		const version = this.store.version;
		const desc = changeCase.pascalCase(this.store.description);

		const extendName = this.store.extendName;	// 扩展的名称，可以是组件名，方法，属性
		const extendNamePascalCase = changeCase.pascalCase(extendName);		// 首字母大写驼峰 TestString
		const extendNameParamCase = changeCase.paramCase(extendName);		// 标签	test-string
		const componentType = this.store.componentType;

		this.registerTransformStream([ 
			filterVue, 
			beautify(), 
			filterVue.restore 
		]);

		this.fs.copyTpl(
	      	glob.sync(this.templatePath('**'), { dot: true }),
			this.destinationPath(folderName),
			{
				projectName,
				author,
				version,
				desc,
				componentType,
				extendNamePascalCase,
				extendNameParamCase
			}
		);

		this.fs.copyTpl(
			this.templatePath("src/components/component.vue"), 
			this.destinationPath(path.join(folderName, `/src/components/${ extendNamePascalCase }.vue`)),
			{ 
				componentType, 
				extendNamePascalCase,
				extendNameParamCase
			}
		)

		this.fs.delete(path.join(folderName, `/src/components/component.vue`))

		if (componentType == 2) {
			this.fs.delete(path.join(folderName, `/src/components/*`))
		}
	}
};