const proceduresData = {
  cervicalSpine: {
    title: 'Cervical Spine',
    injuries: [
      {
        id: 'cervical-herniated-disc',
        name: 'Cervical Herniated Disc',
        description:
          'Protrusion or rupture of a cervical intervertebral disc that may press on nerve roots.',
        treatment: {
          conservative: 'Rest, physical therapy, analgesics, and nerve blocks.',
          severe:
            'Surgery such as discectomy or arthrodesis for persistent or severe cases.',
        },
      },
      {
        id: "cervical-infiltration",
        name: "Vertebral Infiltration",
        description: "Injection, where local analgesic medications, anti-inflammatories, or regenerative therapies are applied. It is frequently used in cases of herniated discs, joint degeneration, sciatica, and persistent lower back or neck pain.",
        treatment: {
          conservative: "Rest, physiotherapy, painkillers, and nerve blocks.",
          severe: "Surgery such as discectomy or arthrodesis in persistent or severe cases."
        }
      },
      {
        id: 'neuropathy-radiculopathy',
        name: 'Neuropathy or Radiculopathy',
        description:
          'Compression or inflammation of cervical nerves causing radiating arm pain.',
        treatment: {
          initial:
            'Anti-inflammatories, physical therapy and postural control.',
          chronic:
            'Epidural injections or decompressive surgery in chronic cases.',
        },
      },
      {
        id: 'spondyloarthrosis',
        name: 'Spondyloarthrosis',
        description:
          'Degeneration of the joints between the cervical vertebrae (arthritis).',
        treatment: {
          standard: 'Physical therapy and pain medications.',
          severe:
            'Surgery if there is significant medullary or radicular compression.',
        },
      },
      {
        id: 'disc-prosthesis',
        name: 'Disc Prosthesis Placement',
        description:
          'Replacement of a cervical disc with a mobile prosthesis to preserve movement.',
        treatment: {
          indication:
            'Surgery indicated when there is severe disc damage without fusion.',
        },
      },
      {
        id: 'vertebral-fusion',
        name: 'Vertebral Fusion',
        description:
          'Surgical union of two or more vertebrae to stabilize the spine.',
        treatment: {
          indication:
            'Indicated in cases of cervical instability, multiple herniations or fractures.',
        },
      },
      {
        id: 'endoscopic-spine-surgery',
        name: 'Endoscopic Cervical Spine Surgery',
        description: 'Minimally invasive technique to decompress nerve roots.',
        treatment: {
          advantages:
            'Faster recovery, less postoperative pain. Indicated for herniations and mild to moderate stenosis.',
        },
      },
    ],
  },
  lumbarSpine: {
    title: 'Lumbar Spine',
    injuries: [
      {
        id: 'lumbar-vertebral-fracture',
        name: 'Lumbar Vertebral Fracture',
        description:
          'Break of a vertebral body, common from falls or accidents.',
        treatment: {
          stable: 'Rest, lumbar corset for stable fractures.',
          unstable:
            'Surgery (fixation with screws) for unstable or with neurological damage.',
        },
      },
      {
        id: 'sciatica',
        name: 'Sciatica',
        description:
          'Pain that radiates down the leg caused by compression of the sciatic nerve.',
        treatment: {
          standard: 'Anti-inflammatory medications, physical therapy.',
          injections: 'Epidural injections.',
          severe: 'Surgery if there is severe persistent compression.',
        },
      },
      {
        id: 'herniated-disc',
        name: 'Herniated Disc or Disc Degeneration',
        description:
          'Protrusion of the intervertebral disc that compresses nerve roots.',
        treatment: {
          initial: 'Initial conservative treatment.',
          refractory: 'Discectomy or endoscopic surgery if refractory.',
        },
      },
      {
        id: 'lumbar-spondyloarthritis',
        name: 'Lumbar Spondyloarthritis',
        description: 'Chronic inflammation of the vertebral joints.',
        treatment: {
          standard:
            'Anti-inflammatories, physical therapy, biological therapy in severe cases.',
        },
      },
      {
        id: 'spinal-stenosis',
        name: 'Spinal Stenosis',
        description: 'Narrowing of the spinal canal that compresses nerves.',
        treatment: {
          conservative: 'Conservative (physical therapy, analgesics).',
          severe: 'Decompression surgery if there is severe claudication.',
        },
      },
      {
        id: 'compression-fracture',
        name: 'Compression Fracture',
        description: 'Crushing of the vertebral body, common in osteoporosis.',
        treatment: {
          standard: 'Rest, analgesia, use of corset.',
          severe: 'Vertebroplasty in cases of severe pain.',
        },
      },
      {
        id: 'cauda-equina',
        name: 'Cauda Equina Syndrome',
        description:
          'Medical emergency due to compression of the lumbar nerve roots.',
        treatment: {
          standard: 'Immediate surgery to decompress the spinal cord.',
        },
      },
      {
        id: 'spinal-fusion',
        name: 'Spinal Fusion',
        description:
          'Surgery to stabilize vertebrae that have lost alignment or mobility.',
        treatment: {
          indications: 'Severe instability, deformities, chronic pain.',
          methods: 'Bone grafts, screws and rods.',
        },
      },
      {
        id: 'endoscopic-spine-surgery-lumbar',
        name: 'Endoscopic Lumbar Spine Surgery',
        description:
          'Minimally invasive technique to decompress nerve roots or repair discs.',
        treatment: {
          advantages: 'Less bleeding, quick recovery, small scars.',
        },
      },
      {
        id: "lumbar-infiltration",
        name: "Vertebral Infiltration",
        description: "Injection, where local analgesic medications, anti-inflammatories, or regenerative therapies are applied. It is frequently used in cases of herniated discs, joint degeneration, sciatica, and persistent lower back or neck pain.",
        treatment: {
          conservative: "Rest, physiotherapy, painkillers, and nerve blocks.",
          severe: "Surgery such as discectomy or arthrodesis in persistent or severe cases."
        }
      },
    ],
  },
  thoracicSpine: {
    title: 'Thoracic Spine',
    injuries: [
      {
        id: 'thoracic-vertebral-fracture',
        name: 'Thoracic Vertebral Fracture',
        description:
          'Break of the vertebral bodies in the middle region of the spine.',
        treatment: {
          conservative: 'Conservative if no neurological damage: corset, rest.',
          unstable: 'Surgical if there is instability: fixation with screws.',
        },
      },
      {
        id: 'thoracic-vertebrae-dislocation',
        name: 'Thoracic Vertebrae Dislocation',
        description:
          'Vertebral displacement generally associated with high-energy trauma.',
        treatment: {
          standard: 'Urgent stabilization.',
          surgical: 'Surgery of reduction and vertebral fixation.',
        },
      },
      {
        id: 'compression-fracture-thoracic',
        name: 'Compression Fracture',
        description:
          'Partial collapse of the vertebral body, common in osteoporosis.',
        treatment: {
          standard: 'Pain control, use of thoracolumbar brace.',
          severe: 'Vertebroplasty or kyphoplasty in painful cases.',
        },
      },
      {
        id: 'sternum-fracture',
        name: 'Sternum Fracture',
        description:
          'Break of the central bone of the thorax, generally from vehicular accidents.',
        treatment: {
          conservative: 'Analgesics, rest.',
          severe: 'Surgery if there is displacement or risk of lung injury.',
        },
      },
      {
        id: 'cauda-equina-thoracic',
        name: 'Cauda Equina Syndrome',
        description:
          'Although more common in the lumbar region, it can appear in high thoracolumbar injuries.',
        treatment: {
          standard: 'Urgent decompressive surgery.',
        },
      },
      {
        id: "thoracic-infiltration",
        name: "Vertebral Infiltration",
        description: "Injection, where local analgesic medications, anti-inflammatories, or regenerative therapies are applied. It is frequently used in cases of herniated discs, joint degeneration, sciatica, and persistent lower back or neck pain.",
        treatment: {
          conservative: "Rest, physiotherapy, painkillers, and nerve blocks.",
          severe: "Surgery such as discectomy or arthrodesis in persistent or severe cases."
        }
      },
      {
        id: 'vertebral-fusion',
        name: 'Vertebral Fusion',
        description:
          'Surgical union of two or more vertebrae to stabilize the spine.',
        treatment: {
          indication:
            'Indicated in cases of cervical instability, multiple herniations or fractures.',
        },
      },
    ],
  }
};

export default proceduresData;
