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
        /* '!style!css!bootstrap/dist/css/bootstrap.min.css',*/
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
            './app/companies',
            './app/reviews',
            './app/weather',
            './app/userprofile',
            './app/search',
            './app/error',
            './app/url',
            '.app/common',
            '.app/constants',
            './app/users'
        ],
        alias: {
            app: 'app',
            modules: path.join(__dirname, "node_modules"),
            applicationStyles: 'app/styles/app.scss',
            loginActions: 'app/login/loginActions.jsx',
            loginReducers: 'app/login/loginReducers.jsx',
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
            companiesActions: 'app/companies/companiesActions.jsx',
            companiesItemsReducer: 'app/companies/companiesReducers.jsx',
            reviewsActions: 'app/reviews/reviewsActions.jsx',
            reviewsItemsReducer: 'app/reviews/reviewsReducers.jsx',
            usersActions: 'app/users/UsersActions',
            usersItemsReducer: 'app/users/usersReducers.jsx',
            accountActions: 'app/account/accountActions.jsx',
            actions: 'app/actions/actions.jsx',
            reducers: 'app/reducers/reducers.jsx',
            configureStore: 'app/store/configureStore.jsx',
            Error: 'app/error/Error.jsx',
            loadingActions: 'app/common/loadingActions.jsx',
            loadingReducers: 'app/common/loadingReducers.jsx',
            serviceCategories: 'app/constants/Categories.js',
            navActions: 'app/navigation/navActions.jsx',
            navReducers: 'app/navigation/navReducers.jsx'
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

            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    sassLoader: {
        includePaths: [
            /* path.resolve(__dirname, './node_modules/foundation-sites/scss')*/
        ]
    },
    devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map'
};
