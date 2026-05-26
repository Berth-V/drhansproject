const proceduresData = {
  cervicalSpine: {
    title: "Columna Cervical",
    injuries: [
      {
        id: "cervical-herniated-disc",
        name: "Hernia de Disco Cervical",
        description: "Protrusión o ruptura de un disco intervertebral cervical que puede presionar raíces nerviosas.",
        treatment: {
          conservative: "Reposo, fisioterapia, analgésicos y bloqueos nerviosos.",
          severe: "Cirugía como discectomía o artrodesis en casos persistentes o graves."
        }
      },
      {
        id: "cervical-infiltration",
        name: "Infiltracion Vertebral",
        description: "Inyeccion, donde se aplican medicamentos analgesicos locales, antiinflamatorios o terapias regenerativas. Se emplea con frecuencia en casos de hernias discales, degaste articular, ciática, dolor lumbar o cervical persistente.",
        treatment: {
          conservative: "Reposo, fisioterapia, analgésicos y bloqueos nerviosos.",
          severe: "Cirugía como discectomía o artrodesis en casos persistentes o graves."
        }
      },
      {
        id: "neuropathy-radiculopathy",
        name: "Neuropatía o Radiculopatía",
        description: "Compresión o inflamación de los nervios cervicales causando dolor irradiado al brazo.",
        treatment: {
          initial: "Antiinflamatorios, fisioterapia y control postural.",
          chronic: "Inyecciones epidurales o cirugía descompresiva en casos crónicos."
        }
      },
      {
        id: "spondyloarthrosis",
        name: "Espondiloartrosis",
        description: "Degeneración de las articulaciones entre las vértebras cervicales (artritis).",
        treatment: {
          standard: "Fisioterapia y medicamentos para el dolor.",
          severe: "Cirugía si hay compresión medular o radicular significativa."
        }
      },
      {
        id: "disc-prosthesis",
        name: "Colocación de Prótesis de Disco",
        description: "Reemplazo de un disco cervical con una prótesis móvil para preservar el movimiento.",
        treatment: {
          indication: "Indicado quirúrgicamente cuando hay daño severo del disco sin fusión."
        }
      },
      {
        id: "vertebral-fusion",
        name: "Fusión Vertebral",
        description: "Unión quirúrgica de dos o más vértebras para estabilizar la columna.",
        treatment: {
          indication: "Indicada en casos de inestabilidad cervical, múltiples hernias o fracturas."
        }
      },
      {
        id: "endoscopic-spine-surgery",
        name: "Cirugía Endoscópica de Columna Cervical",
        description: "Técnica mínimamente invasiva para descomprimir raíces nerviosas.",
        treatment: {
          advantages: "Recuperación más rápida, menos dolor postoperatorio. Indicada para hernias y estenosis leve a moderada."
        }
      }
    ]
  },
  lumbarSpine: {
    title: "Columna Lumbar",
    injuries: [
      {
        id: "lumbar-vertebral-fracture",
        name: "Fractura Vertebral Lumbar",
        description: "Fractura de un cuerpo vertebral, común por caídas o accidentes.",
        treatment: {
          stable: "Reposo, corsé lumbar para fracturas estables.",
          unstable: "Cirugía (fijación con tornillos) para fracturas inestables o con daño neurológico."
        }
      },
      {
        id: "sciatica",
        name: "Ciática",
        description: "Dolor que se irradia por la pierna causado por compresión del nervio ciático.",
        treatment: {
          standard: "Medicamentos antiinflamatorios, fisioterapia.",
          injections: "Inyecciones epidurales.",
          severe: "Cirugía si hay compresión severa persistente."
        }
      },
      {
        id: "herniated-disc",
        name: "Hernia de Disco o Degeneración Discal",
        description: "Protrusión del disco intervertebral que comprime raíces nerviosas.",
        treatment: {
          initial: "Tratamiento conservador inicial.",
          refractory: "Discectomía o cirugía endoscópica si es refractaria."
        }
      },
      {
        id: "lumbar-spondyloarthritis",
        name: "Espondiloartritis Lumbar",
        description: "Inflamación crónica de las articulaciones vertebrales.",
        treatment: {
          standard: "Antiinflamatorios, fisioterapia, terapia biológica en casos graves."
        }
      },
      {
        id: "spinal-stenosis",
        name: "Estenosis Espinal",
        description: "Estrechamiento del canal espinal que comprime nervios.",
        treatment: {
          conservative: "Conservador (fisioterapia, analgésicos).",
          severe: "Cirugía descompresiva si hay claudicación severa."
        }
      },
      {
        id: "compression-fracture",
        name: "Fractura por Compresión",
        description: "Aplastamiento del cuerpo vertebral, común en osteoporosis.",
        treatment: {
          standard: "Reposo, analgesia, uso de corsé.",
          severe: "Vertebroplastia en casos de dolor intenso."
        }
      },
      {
        id: "cauda-equina",
        name: "Síndrome de Cola de Caballo",
        description: "Emergencia médica por compresión de raíces lumbares.",
        treatment: {
          standard: "Cirugía inmediata para descomprimir la médula."
        }
      },
      {
        id: "spinal-fusion",
        name: "Fusión Espinal",
        description: "Cirugía para estabilizar vértebras que han perdido alineación o movilidad.",
        treatment: {
          indications: "Inestabilidad severa, deformidades, dolor crónico.",
          methods: "Injertos óseos, tornillos y barras."
        }
      },
      {
        id: "endoscopic-spine-surgery-lumbar",
        name: "Cirugía Endoscópica de Columna Lumbar",
        description: "Técnica mínimamente invasiva para descomprimir raíces nerviosas o reparar discos.",
        treatment: {
          advantages: "Menor sangrado, recuperación rápida, cicatrices pequeñas."
        }
      },
      {
        id: "lumbar-infiltration",
        name: "Infiltracion Vertebral",
        description: "Inyeccion, donde se aplican medicamentos analgesicos locales, antiinflamatorios o terapias regenerativas. Se emplea con frecuencia en casos de hernias discales, degaste articular, ciática, dolor lumbar o cervical persistente.",
        treatment: {
          conservative: "Reposo, fisioterapia, analgésicos y bloqueos nerviosos.",
          severe: "Cirugía como discectomía o artrodesis en casos persistentes o graves."
        }
      },
    ]
  },
  thoracicSpine: {
    title: "Columna Torácica",
    injuries: [
      {
        id: "thoracic-vertebral-fracture",
        name: "Fractura Vertebral Torácica",
        description: "Fractura de los cuerpos vertebrales en la región media de la columna.",
        treatment: {
          conservative: "Conservador si no hay daño neurológico: corsé, reposo.",
          unstable: "Quirúrgico si hay inestabilidad: fijación con tornillos."
        }
      },
      {
        id: "thoracic-vertebrae-dislocation",
        name: "Luxación de Vértebras Torácicas",
        description: "Desplazamiento vertebral generalmente asociado a trauma de alta energía.",
        treatment: {
          standard: "Estabilización urgente.",
          surgical: "Cirugía de reducción y fijación vertebral."
        }
      },
      {
        id: "compression-fracture-thoracic",
        name: "Fractura por Compresión",
        description: "Colapso parcial del cuerpo vertebral, común en osteoporosis.",
        treatment: {
          standard: "Control del dolor, uso de corsé toracolumbar.",
          severe: "Vertebroplastia o cifoplastia en casos dolorosos."
        }
      },
      {
        id: "sternum-fracture",
        name: "Fractura de Esternón",
        description: "Fractura del hueso central del tórax, generalmente por accidentes vehiculares.",
        treatment: {
          conservative: "Analgésicos, reposo.",
          severe: "Cirugía si hay desplazamiento o riesgo de lesión pulmonar."
        }
      },
      {
        id: "cauda-equina-thoracic",
        name: "Síndrome de Cola de Caballo",
        description: "Aunque es más común en región lumbar, puede presentarse en lesiones toracolumbares altas.",
        treatment: {
          standard: "Cirugía descompresiva urgente."
        }
      },
      {
        id: "thoracic-infiltration",
        name: "Infiltracion Vertebral",
        description: "Inyeccion, donde se aplican medicamentos analgesicos locales, antiinflamatorios o terapias regenerativas. Se emplea con frecuencia en casos de hernias discales, degaste articular, ciática, dolor lumbar o cervical persistente.",
        treatment: {
          conservative: "Reposo, fisioterapia, analgésicos y bloqueos nerviosos.",
          severe: "Cirugía como discectomía o artrodesis en casos persistentes o graves."
        }
      },
      {
        id: "vertebral-fusion",
        name: "Fusión Vertebral",
        description: "Unión quirúrgica de dos o más vértebras para estabilizar la columna.",
        treatment: {
          indication: "Indicada en casos de inestabilidad cervical, múltiples hernias o fracturas."
        }
      }
    ]
  },
};

export default proceduresData;