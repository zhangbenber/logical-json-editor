import * as I from '../typings';

const stringsNodeMeta: I.NodeCategoryMeta = {
  category: '字符串',
  nodes: [
    {
      type: I.NodeType.LOGICAL,
      name: 'cat',
      label: '拼接字符串',
      desc: '将多个字符串拼接，生成一个新的字符串。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.STRING, desc: '输入的多个字符串' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.STRING, desc: '输出字符串' },
          ]
        }
      ]
    },
    
  ],
};

export default stringsNodeMeta;