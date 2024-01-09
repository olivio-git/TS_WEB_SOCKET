class ClientError extends Error {
  statusCode: number;
  constructor(message:string, status = 400) {
    super(message);
    this.statusCode = status;
  }
}

export =  ClientError ;
