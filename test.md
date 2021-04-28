启动测试节点
```
<!-- 创建100个测试地址 -->
ganache-cli  -l 80000000000 --allowUnlimitedContractSize --hardfork muirGlacier -i 5777 -a 100

truffle test --show-events


//部署到测试网
truffle migrate --network ropsten

truffle migrate --network kovan

//部署到本地
truffle migrate --network development
```
Flash-Pool以太坊版本

**当前测试进度：**
- 前后端调试（进行中，预计明天交付除清算外的功能）
    - 目前的主要问题：合约部分初始化动作遗漏和部分bug修复等问题导致进度较慢
- 本地单元测试：usdt,wbtc,pont和cether的mint和redeem执行成功
    - 目前主要问题：无全流程的模板脚本，故调试较慢
    - borrow和Insurance调用失败（原因排查中）
    - 其它问题：测试脚本开发需统一规范，测试检查点需完善和补充

**待完成任务：**
- 1.合约全接口的单元测试（进行中，预计剩余80%的工作量）
- 2.主网上线脚本调试
- 3.应用层黑盒测试（已准备用例，尚未开始）
- 4.上线checkList（未开始）
- 5.合约代码review（未开始）
- 6.测试用例review    
- 6.管理员紧急接口测试，异常场景处理预案（未开始）    

延期风险点：目前尚未进行过一次全流程的功能测试，导致前后端和测试脚本开发缓慢
