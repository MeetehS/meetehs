// @flow

export const COMMANDS = {
  open(url: string) {
    window.open(url);
  },

  duckduckgo(search: string) {
    const DUCKDUCKGO_SEARCH = `//duckduckgo.com/?q=${search}`;

    COMMANDS.open(DUCKDUCKGO_SEARCH);
  },

  google(search: string) {
    const GOOGLE_SEARCH = `//www.google.com.tw/search?q=${search}`;

    COMMANDS.open(GOOGLE_SEARCH);
  },

  baidu(search: string) {
    const BAIDU_SEARCH = `//www.baidu.com/s?wd=${search}`;

    COMMANDS.open(BAIDU_SEARCH);
  },

  wikipedia(search: string) {
    const WIKIPEDIA_SEARCH = `//en.wikipedia.org/wiki/${search}`;

    COMMANDS.open(WIKIPEDIA_SEARCH);
  },

  iciba(search: string) {
    const ICIBA_SEARCH = `//www.iciba.com/${search}`;

    COMMANDS.open(ICIBA_SEARCH);
  },

  youdao(search: string) {
    const YOUDAO_SEARCH = `//youdao.com/w/${search}`;

    COMMANDS.open(YOUDAO_SEARCH);
  },

  github(search: string) {
    const GITHUB_SEARCH = `//github.com/search?q=${search}`;

    COMMANDS.open(GITHUB_SEARCH);
  },

  stackoverflow(search: string) {
    const STACKOVERFLOW_SEARCH = `//stackoverflow.com/search?q=${search}`;

    COMMANDS.open(STACKOVERFLOW_SEARCH);
  },

  npm(search: string) {
    const NPM_SEARCH = `//www.npmjs.com/search?q=${search}`;

    COMMANDS.open(NPM_SEARCH);
  },

  unsplash(search: string) {
    const UNSPLASH_SEARCH = `//unsplash.com/search/photos/${search}`;

    COMMANDS.open(UNSPLASH_SEARCH);
  }
};

export const COMMAND_TRIGGERS = Object.keys(COMMANDS);
