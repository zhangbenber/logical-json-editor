import * as I from '../typings';

const stringsNodeMeta: I.NodeCategoryMeta = {
  category: '类型转换',
  nodes: [
    {
      type: I.NodeType.LOGICAL,
      name: 'toNumber',
      label: '转数字',
      desc: '将输入值转换为数字。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '输入值' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.NUMBER, desc: '输出数字' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'toString',
      label: '转字符串',
      desc: '将输入值转换为字符串。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '输入值' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.STRING, desc: '输出字符串' },
          ]
        }
      ]
    },
    
  ],
};

export default stringsNodeMeta;