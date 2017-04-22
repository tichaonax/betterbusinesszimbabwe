var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch (e) {

}

module.exports = {
    entry: [
        'script!jquery/dist/jquery.min.js',
        'script!foundation-sites/dist/js/foundation.min.js',
        './app/app.jsx'
    ],
    externals: {
        jquery: 'jQuery'
    },
    plugins: [
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                API_KEY: JSON.stringify(process.env.API_KEY),
                AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
                DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
                MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
                STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
                OPEN_WEATHER_APP_ID: JSON.stringify(process.env.OPEN_WEATHER_APP_ID),
                PROJECT_ID: JSON.stringify(process.env.PROJECT_ID)
            }
        }),
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        root: __dirname,
        modulesDirectories: [
            'node_modules',
            './app/account',
            './app/admin',
            './app/admin/services',
            './app/components',
            './app/api',
            './app/home',
            './app/login',
            './app/company',
            './app/review',
            './app/weather',
            './app/userprofile',
            './app/search',
            './app/error',
            './app/url'
        ],
        alias: {
            app: 'app',
            applicationStyles: 'app/styles/app.scss',
            loginActions: 'app/login/loginActions.jsx',
            loginReducers: 'app/login/LoginReducers.jsx',
            errorActions: 'app/error/errorActions.jsx',
            errorReducers: 'app/error/errorReducers.jsx',
            searchActions: 'app/search/searchActions.jsx',
            searchReducers: 'app/search/searchReducers.jsx',
            profileActions: 'app/userprofile/profileActions.jsx',
            profileReducers: 'app/userprofile/profileReducers.jsx',
            urlActions: 'app/url/urlActions.jsx',
            urlReducers: 'app/url/urlReducers.jsx',
            servicesActions: 'app/admin/services/servicesActions.jsx',
            servicesItemsReducer: 'app/admin/services/servicesReducers.jsx',
            accountActions: 'app/account/accountActions.jsx',
            actions: 'app/actions/actions.jsx',
            reducers: 'app/reducers/reducers.jsx',
            configureStore: 'app/store/configureStore.jsx',
            Error: 'app/error/Error.jsx',

        },
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/foundation-sites/scss')
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
