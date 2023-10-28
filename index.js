const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require("readline")





const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
  
  
function list(arg){
    const version = arg['dist-tags'].latest;
    const latest = arg.versions[version]
    //delete arg['versions']
    //console.log(arg)
    const info = {
        name: `${arg.name}`,
        description: latest.description,
        url: `https://npmjs.org/${arg.name}`,
        repo: `×${latest.repository?.url?.replace("×git+","").replace(".git","").replace("git+","")}`,
        page: latest.homepage,
        license: latest.license,
        owner: latest._npmUser.name,
        email: latest._npmUser.email,
        size: (latest.dist.unpackedSize / 1024).toFixed(2) + "kb",
        dependencies: Array.from(Object.keys(latest.dependencies)),
        devdependencies: Array.from(Object.keys(latest.devDependencies)),
        maintainers: latest.maintainers.filter(maintainer => maintainer.email),
        keywords: arg.keywords,
        created: new Date(arg.time.created).toLocaleString(),
        modified: new Date(arg.time.modified).toLocaleString(),
        trdate:{
            created: new Date(arg.time.created).toLocaleString("tr-TR"),
            modified: new Date(arg.time.modified).toLocaleString("tr-TR"),
        },
        timestamps: {
            created: new Date(arg.time.created).getTime(),
            modified: new Date(arg.time.modified).getTime(),
        }
    }
    console.log(info)
    
    
}

function callback(arg){
    fetch(`https://registry.npmjs.com/${arg}`)
        .then(res => res.json())
        .then(json => list(json))
        .catch(err => console.error(err))
};

async function main() {
  let npm = await new Promise((resolve) => {
    rl.question('the npm package name? ', (answer) => {
      resolve(answer);
    });
  });
  callback(npm?.trim())
  rl.close();
}
main();
