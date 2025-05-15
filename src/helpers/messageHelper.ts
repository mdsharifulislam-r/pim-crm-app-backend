
export const sendMessages = <T>(chatid:any, message:T) => {
    //@ts-ignore
    const io = global.io;
    if (io) {
        io.emit(`getMessage::${chatid}`, message);
    }

}
