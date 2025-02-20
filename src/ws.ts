class Client {
    endpoint: string;
    seq: number;
    ready: boolean;
    ws: Promise<WebSocket> | null;
    pending: { [key: number]: { resolve: (value: any) => void; reject: (reason?: any) => void } };
    handler: { [key: string]: Array<(params: any, self: Client) => void> };

    constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.seq = 1;
        this.ready = false;
        this.ws = null;
        this.pending = {};
        this.handler = {};
    }

    connect(): Promise<WebSocket> {
        const self = this;
        if (this.ws != null) {
            return this.ws;
        }
        return (this.ws = new Promise<WebSocket>(function (resolve, reject) {
            const ws = new WebSocket(self.endpoint);
            let pending = true;
            ws.onerror = function (err) {
                if (pending) {
                    pending = false;
                    reject(err);
                    return;
                }

                console.warn("websocket lifetime error:" + err);
                Object.keys(self.pending).forEach(function (k) {
                    self.pending[+k].reject(err);
                    delete self.pending[+k];
                });
            };
            ws.onopen = function () {
                if (pending) {
                    pending = false;
                    resolve(ws);
                }
            };
            ws.onmessage = function (s) {
                let msg: any, request: any, handler: Array<(params: any, self: Client) => void> | undefined;
                try {
                    msg = JSON.parse(s.data);
                } catch (err) {
                    console.warn("parse incoming message error:", err);
                    return;
                }

                // Notice
                if (msg.id === void 0 || msg.id === 0) {
                    if ((handler = self.handler[msg.method])) {
                        handler.forEach((h) => h(msg.params, self));
                        return;
                    }
                    console.warn("no handler for method:", msg.method);
                    return;
                }

                request = self.pending[msg.id];
                if (request == null) {
                    console.warn("no pending request for:", msg.method, msg.id);
                    return;
                }

                delete self.pending[msg.id];
                if (msg.error != null) {
                    request.reject(msg.error);
                } else {
                    request.resolve(msg.result);
                }

                return;
            };
        }));
    }

    call(method: string, params: any): Promise<any> {
        const self = this;
        return this.connect().then(function (conn) {
            const seq = self.seq++;
            const dfd = defer();
            self.pending[seq] = dfd;
            conn.send(
                JSON.stringify({
                    id: seq,
                    method: method,
                    params: params
                })
            );
            return dfd.promise;
        });
    }

    handle(method: string, callback: (params: any, self: Client) => void): void {
        const list = this.handler[method];
        if (list == null) {
            this.handler[method] = [callback];
            return;
        }
        list.push(callback);
    }
}

function defer() {
    const d: { promise: Promise<any>; resolve: (value: any) => void; reject: (reason?: any) => void } = {} as any;
    d.promise = new Promise(function (resolve, reject) {
        d.resolve = resolve;
        d.reject = reject;
    });
    return d;
}