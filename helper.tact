import "@stdlib/deploy";


    message Reach{
        user_addr: Address;
        jetton: Address;
    }  

    message FundReply{
       tokens: map<Address, Int>;
       user: Address;
    }

    message Send {
        jettonAddress: Address;
        amount: Int;
    }
contract Helper with Deployable {
    // Empty init() function is present by default in all Tact contracts
    // since v1.3.0, so the following may be omitted:
    //


    init() {}

    receive(){
        // accept incoming TON transfers
    }

    //step 1
    receive(msg: Reach){
      //  dump(msg.user_addr);
        send( SendParameters{
            to: msg.user_addr,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: Send { jettonAddress: msg.jetton, amount: 1}.toCell()

        });
    }

    //step3
    receive(msg: FundReply){
       
        foreach (key, value in msg.tokens) {
            dump(key);
            dump(value);
        }
    }

    get fun balance(): Int{
        return myBalance();
    }
}
