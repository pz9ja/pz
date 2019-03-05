const con = config.get('pzPrivateKey')
if (!con) {
    console.error('FATAL ERROR: fatal error no config set')
    process.exit(1)
}