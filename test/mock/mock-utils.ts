import Record from '../../src/models/record';

export function getMockRecord(recordId:string):Record{
    return Record.from({
        tdeiRecordId:recordId,
        stage:''
    })

}