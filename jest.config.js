module.exports = {
    rootDir: 'src',
    moduleFileExtensions: [
        'js',
        'jsx'
    ],
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js'
    },
    testEnvironment: 'jsdom'
};
