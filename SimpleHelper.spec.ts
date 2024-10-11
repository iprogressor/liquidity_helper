import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano, Address } from '@ton/core';
import { SimpleHelper } from '../wrappers/SimpleHelper';
import {  Helper } from '../wrappers/Helper';
import '@ton/test-utils';

describe('SimpleHelper', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let simpleHelper: SandboxContract<SimpleHelper>;
    let helper: SandboxContract<Helper>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const user_address = "UQCNLE-08pkLSnpMSIKyRZY3PIS3l1VL3z1rNW0yFxkrBA5d";
        const jetton1 = "0QCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_iaj";
        const jetton2 = "kQALh-JBBIKK7gr0o4AVf9JZnEsFndqO0qTCyT-D-yBsWk0v";
        const jetton3 = "kQDB8JYMzpiOxjCx7leP5nYkchF72PdbWT1LV7ym1uAedDjr";

        simpleHelper = blockchain.openContract(await SimpleHelper.fromInit(Address.parse(user_address),Address.parse(jetton1),Address.parse(jetton2),Address.parse(jetton3)));
        helper = blockchain.openContract(await Helper.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult1 = await simpleHelper.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult1.transactions).toHaveTransaction({
            from: deployer.address,
            to: simpleHelper.address,
            deploy: true,
            success: true,
        });

        const deployResult2 = await helper.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult2.transactions).toHaveTransaction({
            from: deployer.address,
            to: helper.address,
            deploy: true,
            success: true,
        });


        await helper.send(
            deployer.getSender(),
            {
                value: toNano("1")
            }, null
        )

    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and simpleHelper are ready to use
    });




    it('should send1' , async()=>{

        await helper.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Reach',
                user_addr:simpleHelper.address,
                jetton:Address.parse("0QCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_iaj")
            }
        );
    });


    it('should send2' , async()=>{
        
        await helper.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Reach',
                user_addr:simpleHelper.address,
                jetton:Address.parse("kQALh-JBBIKK7gr0o4AVf9JZnEsFndqO0qTCyT-D-yBsWk0v")
            }
        );
    });

    it('should send2' , async()=>{
        
        await helper.send(
            deployer.getSender(),
            {
                value: toNano('0.5'),
            },
            {
                $$type: 'Reach',
                user_addr:simpleHelper.address,
                jetton:Address.parse("kQDB8JYMzpiOxjCx7leP5nYkchF72PdbWT1LV7ym1uAedDjr")
            }
        );
    });

    it('should know balance' , async()=>{
        const SHbalance = await simpleHelper.getBalance();

        console.log("balance simple helper -", SHbalance);

        const HelperBalance = await helper.getBalance();

        console.log("balance  helper -", HelperBalance);


    });



});
