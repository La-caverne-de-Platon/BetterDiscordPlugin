//META{"name":"Platon","displayName":"Platon","website":"https://github.com/planetarian/BetterDiscordPlugins","source":"https://raw.githubusercontent.com/planetarian/BetterDiscordPlugins/master/Platon.plugin.js"}*//

var Platon = (() => {
    const config = {"info":{"name":"Platon","authors":[{"name":"Platon"}],"version":"0.0.1","description":"Des macros pré-enregistrés pour certains messages Discords","github":"","github_raw":""},"changelog":[{"title":"0.0.1","items":["Hello, world","plop"]}],"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            const title = "Library Missing";
            const ModalStack = BdApi.findModuleByProps("push", "update", "pop", "popWithKey");
            const TextElement = BdApi.findModuleByProps("Sizes", "Weights");
            const ConfirmationModal = BdApi.findModule(m => m.defaultProps && m.key && m.key() == "confirm-modal");
            if (!ModalStack || !ConfirmationModal || !TextElement) return BdApi.alert(title, `The library plugin needed for ${config.info.name} is missing.<br /><br /> <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js" target="_blank">Click here to download the library!</a>`);
            ModalStack.push(function(props) {
                return BdApi.React.createElement(ConfirmationModal, Object.assign({
                    header: title,
                    children: [BdApi.React.createElement(TextElement, {color: TextElement.Colors.PRIMARY, children: [`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`]})],
                    red: false,
                    confirmText: "Download Now",
                    cancelText: "Cancel",
                    onConfirm: () => {
                        require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                            if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                            await new Promise(r => require("fs").writeFile(require("path").join(ContentManager.pluginsFolder, "0PluginLibrary.plugin.js"), body, r));
                        });
                    }
                }, props));
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {

    const { Logger, DiscordModules, Patcher, Settings } = Library;

    return class Platon extends Plugin {
        constructor() {
            super();
        }

        onStart() {
            Logger.log("Started");
            
            Patcher.before(DiscordModules.MessageActions, "sendMessage", (t,a) => {
                let content = a[1].content;
                if (content.includes("!start")) {
                  let msg = `• Bonjour :wave:  **Je vais t'aider**. Pour plus de clarté, **restons dans ce fil de discussion**.\n →**Si jamais les autres veulent aider, s'il vous plaît __préférez faire cela en dehors de ce fil__** :pray:`;
                  a[1].content = msg;
                }
                if (content.includes("!plan")) {
                  let msg = `💪🏋️🧠 Tu peux suivre ce lien pour apprendre **simplement** et **rapidement** à faire un plan __**solide**__ en quelques étapes ! → https://lacavernedeplaton.fr/m%C3%A9thode/ \n → Mais sinon, il ne faut pas hésiter à me dire ici ce que tu as déjà commencé à faire pour ton travail 😉`;
                  a[1].content = msg;
                }
                if (content.includes("!intro")) {
                  let msg = `🔪🧅🧑‍🍳 Tu peux suivre ce lien pour apprendre **simplement** et **rapidement** à faire une introduction __**aux petits oignons**__ en quelques étapes ! → https://lacavernedeplaton.fr/m%C3%A9thode/intro.php \n → Mais sinon, il ne faut pas hésiter à me dire ici ce que tu as déjà commencé à faire pour ton travail 😉`;
                  a[1].content = msg;
                }
                if (content.includes("!dev")) {
                  let msg = `🕵️🔍🗒️ Tu peux suivre ce lien pour apprendre **simplement** et **rapidement** à développer __**méthodiquement**__ tes idées ! → https://lacavernedeplaton.fr/m%C3%A9thode/dev.php \n → Mais sinon, il ne faut pas hésiter à me dire ici ce que tu as déjà commencé à faire pour ton travail 😉`;
                  a[1].content = msg;
                }
                if (content.includes("!autoeval")) {
                  let msg = `🤓✨🧑‍🏫 Tu peux suivre ce lien pour **auto-évaluer** ton travail et savoir à peu près la note que tu peux avoir **en direct** : https://lacavernedeplaton.fr/eval/index.php \n → Mais sinon, il ne faut pas hésiter à me dire ici ce que tu as déjà commencé à faire pour ton travail 😉`;
                  a[1].content = msg;
                }
                if (content.includes("!fiche")) {
                  let msg = `📚 Tu peux trouver → [ici](https://lacavernedeplaton.fr/auteurs/) ← des fiches auteurs avec : \n- des cartes mentales pour comprendre les idées 💡\n- des mini-cours rédigés à propos des philosophes 🧑‍🏫\n- et même la possibilité de leur poser directement des questions via l'I.A. 🤖 ! `;
                  a[1].content = msg;
                }

            });

            this.update();
        }

        onStop() {
            Patcher.unpatchAll();
            Logger.log("Stopped");
        }

        
        observer({ addedNodes, removedNodes }) {
        }

        update() {
            this.initialized = true;
        }

        getChatTextArea() {
            return $(".slateTextArea-1bp44y");
        }        
    };

};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/
