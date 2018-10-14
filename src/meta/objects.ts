import * as I from '../typings';

const objectsNodeMeta: I.NodeCategoryMeta = {
  category: '对象',
  nodes: [
    {
      type: I.NodeType.LOGICAL,
      name: 'compose',
      desc: '根据传入的键值对，生成一个对象。',
      portGroups: [
        {
          extendable: true,
          defaultPairs: 2,
          ports: [
            { name: 'key', direction: I.PortDirection.IN, type: I.PortType.STRING, desc: '输入的键名称。' },
            { name: 'value', direction: I.PortDirection.IN, type: I.PortType.ANY, desc: '与各个键相对应的一系列值。' },
          ]
        },
        {
          extendable: false,
          ports: [
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.OBJECT, desc: '生成的对象。' },
          ]
        }
      ]
    },

    {
      type: I.NodeType.LOGICAL,
      name: 'pick',
      desc: '从一个对象中获取某个特定键对应的值。',
      portGroups: [
        {
          extendable: false,
          ports: [
            { name: 'in', direction: I.PortDirection.IN, type: I.PortType.OBJECT, desc: '输入对象。' },
            { name: 'key', direction: I.PortDirection.IN, type: I.PortType.STRING, desc: '要查找的键名称。' },
            { name: 'out', direction: I.PortDirection.OUT, type: I.PortType.ANY, desc: '输出值。' },
          ]
        }
      ]
    },

  ],
};

export default objectsNodeMeta;