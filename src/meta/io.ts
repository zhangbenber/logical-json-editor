import * as I from '../typings';

const ioNodeMeta: I.NodeCategoryMeta = {
  category: '输入和输出',
  nodes: [
    {
      type: I.NodeType.INPUT,
      name: 'input',
      label: '输入',
      desc: '从逻辑外部获取输入。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.ANY, desc: '从外部传入的值' }
          ]
        }
      ]
    },

    {
      type: I.NodeType.OUTPUT,
      name: 'output',
      label: '输出',
      desc: '向逻辑外部输出结果。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '向外部输出的值' }
          ]
        }
      ]
    },
  ]
};

export default ioNodeMeta;