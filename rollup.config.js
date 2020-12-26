import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import sveltePreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';
//import { createBasicConfig } from '@open-wc/building-rollup';
import { injectManifest } from 'rollup-plugin-workbox'

const production = !process.env.ROLLUP_WATCH;
/*
const baseConfig = createBasicConfig();

export default merge(baseConfig, {
  input: './index.html',
});
*/

const assetsDir = 'assets'


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		//format: 'iife',
		format: 'esm',
		name: 'app',
		//file: 'public/build/bundle.js'
		dir:'public/build/',
		chunkFileNames: '[name].js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess(),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),
		/*!production && livereload({
			watch: "public/build/App.js",
			delay: 200
		  }),*/

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
		injectManifest({
            globDirectory: assetsDir,
            globPatterns: ['**/*.{js,css,svg}', '__app.html'],
            swSrc: `src/sw.js`,
            swDest: `public/build/serviceworker.js`,
            maximumFileSizeToCacheInBytes: 10000000, // 10 MB,
            mode: 'production'
        }),
	],
	watch: {
		clearScreen: false
	}
};
