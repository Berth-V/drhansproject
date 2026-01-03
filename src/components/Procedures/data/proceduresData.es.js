const proceduresData = {
  ankle: {
    title: "Tobillo",
    injuries: [
      {
        id: "malleolar-fractures",
        name: "Fracturas maleolares",
        description: "Fractura de uno o más maleolos (medial, lateral o posterior).",
        treatment: {
          stable: "Inmovilización con férula o bota ortopédica.",
          displaced: "Cirugía con placas y tornillos.",
          rehabilitation: "Rehabilitación física postoperatoria."
        }
      },
      {
        id: "perimalleolar-ligament-injury",
        name: "Lesión de ligamentos perimaleolares",
        description: "Daño a los ligamentos alrededor del tobillo por torsión o accidente.",
        treatment: {
          mild: "Método RICE (reposo, hielo, compresión, elevación), inmovilización y rehabilitación.",
          severe: "Posible cirugía reconstructiva en caso de ruptura completa.",
          goal: "Recuperar la estabilidad del tobillo."
        }
      },
      {
        id: "ankle-cartilage-injury",
        name: "Lesión del cartílago articular del tobillo",
        description: "Daño al cartílago articular, causado por traumatismo o desgaste.",
        treatment: {
          mild: "Fisioterapia, antiinflamatorios, PRP o ácido hialurónico.",
          moderate: "Artroscopia o aplicación de ácido hialurónico.",
          severe: "Injerto de cartílago o cirugía mayor."
        }
      },
      {
        id: "ankle-syndesmosis-injury",
        name: "Lesión de la sindesmosis del tobillo",
        description: "Separación de la articulación entre tibia y peroné, común en deportistas.",
        treatment: {
          mild: "Bota ortopédica y fisioterapia.",
          severe: "Cirugía con tornillos o sistema TightRope.",
          note: "Requiere recuperación prolongada."
        }
      },
      {
        id: "calcaneus-fracture",
        name: "Fractura de calcáneo",
        description: "Fractura del hueso del talón, común en caídas desde altura.",
        treatment: {
          nonDisplaced: "Reposo e inmovilización.",
          displaced: "Cirugía con placas y tornillos.",
          rehabilitation: "Fisioterapia para evitar rigidez o artritis postraumática."
        }
      }
    ]
  },
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
  clavicle: {
    title: "Clavícula",
    injuries: [
      {
        id: "clavicle-fracture",
        name: "Fractura de Clavícula",
        description: "Fractura común del hueso entre el esternón y el hombro.",
        treatment: {
          nonDisplaced: "Inmovilización con cabestrillo para fracturas no desplazadas.",
          displaced: "Cirugía con placa y tornillos para fracturas desplazadas."
        }
      },
      {
        id: "acromioclavicular-dislocation",
        name: "Luxación Acromioclavicular",
        description: "Separación entre la clavícula y el acromion (hombro).",
        treatment: {
          mild: "Cabestrillo, hielo y rehabilitación para grados leves.",
          severe: "Cirugía reconstructiva con fijación para grados altos."
        }
      },
      {
        id: "displaced-clavicle-fracture",
        name: "Fractura Desplazada de Clavícula",
        description: "Fractura con extremos óseos separados o superpuestos.",
        treatment: {
          standard: "Cirugía con osteosíntesis para realinear el hueso."
        }
      },
      {
        id: "distal-clavicle-fracture",
        name: "Fractura Distal de Clavícula",
        description: "Fractura en el tercio externo de la clavícula, cerca del hombro.",
        treatment: {
          note: "Alta tasa de no unión, frecuentemente requiere cirugía."
        }
      }
    ]
  },
  elbow: {
    title: "Codo",
    injuries: [
      {
        id: "elbow-dislocation",
        name: "Luxación de Codo",
        description: "Desplazamiento de los huesos del codo fuera de su alineación.",
        treatment: {
          immediate: "Reducción manual inmediata.",
          followUp: "Inmovilización temporal y fisioterapia.",
          severe: "Cirugía si hay daño ligamentario grave."
        }
      },
      {
        id: "epicondylitis",
        name: "Epicondilitis",
        description: "Inflamación de los tendones del codo (codo de tenista o de golfista).",
        treatment: {
          standard: "Fisioterapia, antiinflamatorios y férula.",
          chronic: "Inyecciones o cirugía si es crónica."
        }
      },
      {
        id: "olecranon-fracture",
        name: "Fractura de Olécranon",
        description: "Fractura del extremo posterior del cúbito, parte del codo.",
        treatment: {
          nonDisplaced: "Inmovilización para fracturas no desplazadas.",
          complex: "Cirugía con placa o alambre para fracturas complejas."
        }
      },
      {
        id: "supracondylar-humerus-fracture",
        name: "Fractura Supracondílea de Húmero",
        description: "Fractura por encima de la articulación del codo, común en niños.",
        treatment: {
          standard: "Reducción cerrada o quirúrgica.",
          stabilization: "Estabilización con clavos o placas."
        }
      },
      {
        id: "distal-radius-fracture",
        name: "Fractura de Radio Distal",
        description: "Fractura cerca de la muñeca que también puede afectar el codo.",
        treatment: {
          standard: "Reducción y yeso o cirugía con placas si está desplazada."
        }
      },
      {
        id: "elbow-arthroscopy",
        name: "Artroscopia de Codo",
        description: "Cirugía mínimamente invasiva para tratar lesiones internas del codo.",
        treatment: {
          uses: "Se utiliza para remover cuerpos libres, tratar lesiones de cartílago o inflamación crónica.",
          advantage: "Recuperación más rápida comparada con cirugía abierta."
        }
      }
    ]
  },
  femur: {
    title: "Fémur",
    injuries: [
      {
        id: "femoral-diaphysis-fracture",
        name: "Fractura de Diáfisis Femoral",
        description: "Fractura del eje largo del fémur, generalmente por traumatismo severo (accidentes, caídas).",
        treatment: {
          standard: "Casi siempre quirúrgica: fijación con clavo intramedular.",
          children: "En niños, a veces tracción + yeso si la fractura no está desplazada."
        }
      },
      {
        id: "femoral-neck-fracture",
        name: "Fractura de Cuello Femoral",
        description: "Fractura entre la cabeza femoral y el eje del hueso, común en personas mayores.",
        treatment: {
          young: "Fijación con tornillos en pacientes jóvenes.",
          elderly: "Reemplazo parcial (hemiartroplastia) o total (prótesis de cadera) en adultos mayores."
        }
      },
      {
        id: "distal-femur-fracture",
        name: "Fractura de Fémur Distal",
        description: "Fractura cerca de la rodilla, afecta la articulación y puede ser intraarticular.",
        treatment: {
          standard: "Cirugía con placas y tornillos.",
          rehabilitation: "Rehabilitación prolongada para recuperar la movilidad de la rodilla."
        }
      },
      {
        id: "periprosthetic-fracture",
        name: "Fractura Periprotésica",
        description: "Fractura alrededor de una prótesis de cadera o rodilla ya colocada.",
        treatment: {
          evaluation: "Evaluación cuidadosa: si la prótesis es estable, puede fijarse con placas o clavos.",
          severe: "En casos graves: revisión completa de la prótesis."
        }
      }
    ]
  },
  foot: {
    title: "Pie",
    injuries: [
      {
        id: "metatarsal-fracture",
        name: "Fractura de Metatarsiano",
        description: "Fractura de uno de los huesos largos del antepié.",
        treatment: {
          nonDisplaced: "Inmovilización con bota o yeso para fracturas no desplazadas.",
          displaced: "Cirugía con tornillos o placas para fracturas desplazadas."
        }
      },
      {
        id: "bunions",
        name: "Juanetes o Hallux Valgus",
        description: "Desviación lateral del dedo gordo, genera bulto en la base del dedo.",
        treatment: {
          initial: "Plantillas, calzado amplio y férulas nocturnas.",
          advanced: "Cirugía correctiva (osteotomía y realineación) para casos avanzados."
        }
      },
      {
        id: "claw-hammer-toes",
        name: "Dedos en Garra o Martillo",
        description: "Deformidad de los dedos menores, que se doblan hacia abajo o hacia arriba.",
        treatment: {
          conservative: "Calzado ortopédico, ejercicios y férulas.",
          fixed: "Cirugía para deformidades fijas."
        }
      },
      {
        id: "plantar-fasciitis",
        name: "Fascitis Plantar",
        description: "Inflamación del tejido que sostiene el arco del pie.",
        treatment: {
          standard: "Reposo, fisioterapia, antiinflamatorios y plantillas ortopédicas.",
          resistant: "Inyección de corticosteroides o liberación quirúrgica en casos resistentes."
        }
      },
      {
        id: "calcaneus-fracture-foot",
        name: "Fractura de Calcáneo",
        description: "Fractura del hueso que forma el talón, generalmente por caída desde altura.",
        treatment: {
          mild: "Inmovilización en casos leves.",
          displaced: "Cirugía con placa para fracturas desplazadas.",
          rehabilitation: "Rehabilitación extensa para recuperar la marcha."
        }
      },
      {
        id: "tarsal-bone-fracture",
        name: "Fractura de Huesos del Tarso",
        description: "Fracturas en los huesos pequeños del mediopié.",
        treatment: {
          evaluation: "Requiere estudio radiológico detallado.",
          displaced: "Puede requerir inmovilización o cirugía si está desplazada."
        }
      },
      {
        id: "flat-foot",
        name: "Pie Plano",
        description: "Colapso del arco del pie, congénito o adquirido (adulto).",
        treatment: {
          mild: "Plantillas ortopédicas y ejercicios en casos leves.",
          advanced: "Cirugía reconstructiva si hay dolor persistente o deformidad avanzada."
        }
      }
    ]
  },
  forearm: {
    title: "Antebrazo",
    injuries: [
      {
        id: "distal-radius-fracture-forearm",
        name: "Fractura de Radio Distal",
        description: "Fractura cerca de la muñeca, muy común tras caídas.",
        treatment: {
          mild: "Reducción e inmovilización con yeso para casos leves.",
          displaced: "Cirugía con placas y tornillos para fracturas desplazadas o inestables."
        }
      },
      {
        id: "ulna-fracture",
        name: "Fractura de Cúbito",
        description: "Lesión del hueso medial del antebrazo, frecuentemente por trauma directo.",
        treatment: {
          simple: "Férula o yeso para fracturas simples.",
          complex: "Cirugía para fracturas desplazadas o con afectación articular."
        }
      },
      {
        id: "elbow-dislocation-forearm",
        name: "Luxación de Codo",
        description: "Separación de las superficies articulares del codo.",
        treatment: {
          immediate: "Reducción inmediata.",
          followUp: "Inmovilización seguida de fisioterapia.",
          severe: "Cirugía si hay fractura asociada o luxaciones recurrentes."
        }
      },
      {
        id: "radius-ulna-diaphysis-fracture",
        name: "Fractura de Diáfisis de Radio o Cúbito",
        description: "Fractura en el eje medio de uno o ambos huesos del antebrazo.",
        treatment: {
          standard: "Generalmente quirúrgica: fijación interna con placas.",
          children: "En niños, a veces tratable con yeso si no hay desplazamiento."
        }
      },
      {
        id: "displaced-radius-fracture",
        name: "Fractura de Radio Desplazada",
        description: "Fractura de radio donde los fragmentos óseos no están alineados.",
        treatment: {
          standard: "Cirugía con reducción abierta y fijación con placa."
        }
      }
    ]
  },
  hand: {
    title: "Mano",
    injuries: [
      {
        id: "carpal-tunnel",
        name: "Síndrome del Túnel Carpiano",
        description: "Compresión del nervio mediano al pasar por el túnel carpiano de la muñeca.",
        treatment: {
          conservative: "Férulas nocturnas, antiinflamatorios, fisioterapia.",
          severe: "Liberación quirúrgica del ligamento transverso del carpo en casos graves."
        }
      },
      {
        id: "metacarpal-fracture",
        name: "Fractura de Metacarpo",
        description: "Fractura de los huesos largos de la mano.",
        treatment: {
          mild: "Férula o yeso para casos leves.",
          displaced: "Cirugía con clavos o placas para fracturas desplazadas o inestables."
        }
      },
      {
        id: "finger-dislocation",
        name: "Luxación de Dedo",
        description: "Separación de los huesos de la articulación de un dedo.",
        treatment: {
          immediate: "Reducción cerrada inmediata.",
          followUp: "Inmovilización breve y ejercicios de movilidad.",
          severe: "Cirugía si es inestable o hay lesión ligamentaria."
        }
      },
      {
        id: "trigger-finger",
        name: "Dedo en Gatillo o Tendinitis Flexora",
        description: "Inflamación que provoca que el dedo se trabe al flexionar.",
        treatment: {
          standard: "Inyección de corticosteroides, férula nocturna.",
          persistent: "Cirugía si no mejora: liberación del tendón."
        }
      },
      {
        id: "flexor-extensor-tendon-injury",
        name: "Lesión de Tendones Flexores o Extensores",
        description: "Corte o ruptura de los tendones que controlan el movimiento de los dedos.",
        treatment: {
          standard: "Cirugía urgente para reparar el tendón.",
          rehabilitation: "Fisioterapia postoperatoria estricta."
        }
      }
    ]
  },
  hip: {
    title: "Cadera",
    injuries: [
      {
        id: "femoral-neck-fracture-hip",
        name: "Fractura de Cuello Femoral",
        description: "Fractura en la parte superior del fémur, justo debajo de la cabeza femoral. Frecuente en adultos mayores.",
        treatment: {
          young: "Fijación interna con tornillos en pacientes jóvenes.",
          elderly: "Colocación de prótesis parcial o total en adultos mayores."
        }
      },
      {
        id: "hip-wear",
        name: "Desgaste de Cadera o Artrosis",
        description: "Degeneración progresiva del cartílago articular, causa dolor y limitación de movimiento.",
        treatment: {
          initial: "Analgésicos, fisioterapia, control de peso.",
          advanced: "Reemplazo total de cadera (prótesis)."
        }
      },
      {
        id: "labrum-injury",
        name: "Lesión de Labrum o Borde Acetabular",
        description: "Daño al anillo de cartílago que rodea la cavidad de la cadera.",
        treatment: {
          conservative: "Fisioterapia, medicación.",
          persistent: "Artroscopia de cadera para reparar o resecar el labrum."
        }
      },
      {
        id: "hip-dislocation",
        name: "Luxación de Cadera",
        description: "La cabeza femoral sale de la cavidad acetabular.",
        treatment: {
          standard: "Reducción urgente bajo anestesia.",
          followUp: "Inmovilización o reposo.",
          severe: "Cirugía si hay daño óseo o luxaciones recurrentes."
        }
      },
      {
        id: "osteoporosis-hip-fracture",
        name: "Fractura de Cadera por Osteoporosis",
        description: "Fractura por trauma leve o no traumática en personas con baja densidad ósea.",
        treatment: {
          standard: "Cirugía (prótesis o fijación).",
          followUp: "Tratamiento posterior de osteoporosis con medicación y dieta."
        }
      },
      {
        id: "hip-prosthesis",
        name: "Colocación de Prótesis de Cadera",
        description: "Reemplazo de la articulación dañada con prótesis de metal o cerámica.",
        treatment: {
          indications: "Artrosis avanzada, fracturas complejas, necrosis avascular.",
          rehabilitation: "Fundamental para recuperar movilidad y fuerza."
        }
      }
    ]
  },
  humerus: {
    title: "Húmero",
    injuries: [
      {
        id: "proximal-humerus-fracture",
        name: "Fractura de Húmero Proximal",
        description: "Lesión cerca del hombro, común en caídas de personas mayores.",
        treatment: {
          nonDisplaced: "Cabestrillo e inmovilización para fracturas no desplazadas.",
          displaced: "Cirugía con placas o clavos, o prótesis si está muy fragmentada."
        }
      },
      {
        id: "humerus-diaphysis-fracture",
        name: "Fractura de Diáfisis de Húmero",
        description: "Fractura del eje medio del hueso del brazo.",
        treatment: {
          conservative: "Conservadora con férula en U o yeso colgante.",
          unstable: "Cirugía en casos inestables: fijación interna."
        }
      },
      {
        id: "distal-humerus-fracture",
        name: "Fractura de Húmero Distal",
        description: "Fractura cerca del codo, más común en niños y adultos mayores.",
        treatment: {
          standard: "Cirugía con placas y tornillos.",
          rehabilitation: "Rehabilitación intensiva para recuperar movilidad del codo."
        }
      },
      {
        id: "radial-nerve-injury",
        name: "Lesión del Nervio Radial",
        description: "Puede ocurrir junto con fracturas de húmero; causa debilidad en extensión de muñeca y dedos.",
        treatment: {
          standard: "Observación y recuperación espontánea.",
          persistent: "Cirugía si no hay recuperación en semanas/meses."
        }
      },
      {
        id: "elbow-dislocation-humerus-fracture",
        name: "Luxación de Codo con Fractura de Húmero",
        description: "Lesión compleja con compromiso articular y óseo.",
        treatment: {
          standard: "Cirugía para realinear articulaciones y estabilizar fracturas.",
          rehabilitation: "Rehabilitación para prevenir rigidez."
        }
      }
    ]
  },
  knee: {
    title: "Rodilla",
    injuries: [
      {
        id: "knee-dislocation",
        name: "Luxación de Rodilla",
        description: "Desplazamiento completo de la tibia respecto al fémur. Lesión grave que puede dañar ligamentos y vasos sanguíneos.",
        treatment: {
          immediate: "Reducción inmediata en urgencias.",
          evaluation: "Evaluación vascular (angiografía).",
          severe: "Cirugía para reparar ligamentos si es inestable.",
          rehabilitation: "Rehabilitación prolongada."
        }
      },
      {
        id: "meniscus-injury",
        name: "Lesión de Menisco",
        description: "Daño a los cartílagos que actúan como amortiguadores dentro de la rodilla.",
        treatment: {
          initial: "Reposo, antiinflamatorios, fisioterapia.",
          persistent: "Artroscopia para resección o sutura meniscal."
        }
      },
      {
        id: "patella-fracture",
        name: "Fractura de Rótula",
        description: "Fractura del hueso anterior de la rodilla (rótula), generalmente por trauma directo.",
        treatment: {
          nonDisplaced: "Inmovilización con férula o yeso para fracturas no desplazadas.",
          displaced: "Cirugía con alambre o tornillos para fracturas desplazadas."
        }
      },
      {
        id: "patellofemoral-syndrome",
        name: "Síndrome Patelofemoral",
        description: "Dolor en la parte anterior de la rodilla debido a roce anormal entre la rótula y el fémur.",
        treatment: {
          standard: "Fisioterapia (fortalecimiento de cuádriceps).",
          activity: "Modificación de actividades.",
          severe: "Cirugía en casos graves (liberación lateral o realineación)."
        }
      },
      {
        id: "total-knee-prosthesis",
        name: "Prótesis Total de Rodilla",
        description: "Reemplazo de superficies articulares con componentes de metal y plástico.",
        treatment: {
          indications: "Artrosis avanzada, deformidades graves, dolor crónico incapacitante.",
          rehabilitation: "Fisioterapia diaria durante semanas o meses."
        }
      },
      {
        id: "knee-arthroscopy",
        name: "Artroscopia de Rodilla",
        description: "Cirugía mínimamente invasiva para reparar tejidos intraarticulares.",
        treatment: {
          advantages: "Menor dolor postoperatorio, recuperación más rápida, cicatrices mínimas."
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
      }
    ]
  },
  shoulder: {
    title: "Hombro",
    injuries: [
      {
        id: "rotator-cuff-injury",
        name: "Lesión del Manguito Rotador",
        description: "Daño a uno o más tendones que forman el manguito rotador (supraespinoso, infraespinoso, subescapular y redondo menor).",
        treatment: {
          conservative: "Fisioterapia, antiinflamatorios, reposo.",
          complete: "Quirúrgica: artroscópica o abierta si hay ruptura completa."
        }
      },
      {
        id: "shoulder-wear",
        name: "Desgaste Articular de Hombro (Osteoartritis Glenohumeral)",
        description: "Degeneración progresiva del cartílago que recubre la articulación del hombro.",
        treatment: {
          standard: "Inyecciones, fisioterapia, control del dolor.",
          advanced: "Prótesis total de hombro en casos avanzados."
        }
      },
      {
        id: "proximal-humerus-fracture-shoulder",
        name: "Fractura de Húmero Proximal",
        description: "Fractura en la parte superior del húmero, común en personas mayores tras caídas.",
        treatment: {
          conservative: "Conservador con cabestrillo, rehabilitación.",
          displaced: "Cirugía: placas, tornillos o prótesis en fracturas desplazadas."
        }
      },
      {
        id: "shoulder-dislocation",
        name: "Luxación de Hombro",
        description: "Salida de la cabeza humeral de la cavidad glenoidea (anterior es la más común).",
        treatment: {
          immediate: "Reducción urgente.",
          rehabilitation: "Fisioterapia para recuperación.",
          recurrent: "Cirugía si hay luxaciones recurrentes (reparación de Bankart, remplissage)."
        }
      },
      {
        id: "clavicle-fracture-shoulder",
        name: "Fractura de Clavícula",
        description: "Fractura ósea entre esternón y hombro, frecuente por traumatismo.",
        treatment: {
          conservative: "Conservador con vendaje en 8.",
          severe: "Cirugía con placa si hay desplazamiento o conminución severa."
        }
      },
      {
        id: "acromion-fracture",
        name: "Fractura de Acromion",
        description: "Lesión del hueso que forma parte de la escápula y el techo del hombro.",
        treatment: {
          stable: "Reposo, hielo, cabestrillo si es estable.",
          displaced: "Cirugía si hay desplazamiento significativo."
        }
      }
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
      }
    ]
  },
  tibiaFibula: {
    title: "Tibia y Peroné",
    injuries: [
      {
        id: "tibia-diaphysis-fracture",
        name: "Fractura de Diáfisis de Tibia",
        description: "Fractura en la parte media de la tibia, usualmente por trauma directo o accidentes.",
        treatment: {
          stable: "Yeso o férula para fracturas estables.",
          unstable: "Fijación interna con clavos intramedulares o placas para fracturas desplazadas o inestables."
        }
      },
      {
        id: "distal-tibia-fracture",
        name: "Fractura de Tibia Distal",
        description: "Fractura cerca del tobillo, puede afectar también la articulación.",
        treatment: {
          nonDisplaced: "Reducción y yeso si no hay desplazamiento.",
          displaced: "Cirugía en fracturas articulares o con desplazamiento (placas y tornillos)."
        }
      },
      {
        id: "supracondylar-tibia-fracture",
        name: "Fractura Supracondílea de Tibia",
        description: "Lesión justo por encima de la articulación de la rodilla.",
        treatment: {
          standard: "Fijación quirúrgica con placas, clavos o tornillos.",
          rehabilitation: "Fisioterapia postoperatoria para recuperar movilidad."
        }
      },
      {
        id: "tibia-stress-fracture",
        name: "Fractura por Estrés de Tibia",
        description: "Microfracturas causadas por sobreuso, comunes en deportistas.",
        treatment: {
          standard: "Reposo, suspensión de actividad física, fisioterapia.",
          severe: "Inmovilización temporal o cirugía en casos graves."
        }
      }
    ]
  },
  wrist: {
    title: "Muñeca",
    injuries: [
      {
        id: "distal-radius-fracture-wrist",
        name: "Fractura de Radio Distal",
        description: "La fractura de muñeca más común, causada por caídas sobre la mano extendida.",
        treatment: {
          nonDisplaced: "Yeso o férula para fracturas no desplazadas.",
          displaced: "Reducción cerrada o cirugía (placas, clavos) para fracturas desplazadas."
        }
      },
      {
        id: "wrist-dislocation",
        name: "Luxación de Muñeca",
        description: "Desplazamiento anormal de los huesos del carpo respecto al radio o cúbito.",
        treatment: {
          standard: "Reducción cerrada o abierta según el grado de lesión.",
          stabilization: "Estabilización con fijadores temporales o cirugía."
        }
      },
      {
        id: "scaphoid-fracture",
        name: "Fractura de Escafoides",
        description: "Fractura del hueso escafoides, uno de los carpianos, difícil de diagnosticar inicialmente.",
        treatment: {
          standard: "Inmovilización prolongada (debido a su lenta consolidación).",
          surgical: "Cirugía si hay desplazamiento o pseudoartrosis (injerto óseo, tornillo canulado)."
        }
      },
      {
        id: "carpal-bone-fracture",
        name: "Fractura de Huesos Carpianos",
        description: "Fractura de cualquiera de los pequeños huesos de la muñeca.",
        treatment: {
          standard: "Yeso o inmovilización.",
          severe: "Cirugía si hay múltiples fracturas o desplazamiento."
        }
      },
      {
        id: "carpal-tunnel-wrist",
        name: "Síndrome del Túnel Carpiano",
        description: "Compresión del nervio mediano en el túnel carpiano, provoca hormigueo y dolor en la mano.",
        treatment: {
          conservative: "Férulas nocturnas, antiinflamatorios, fisioterapia.",
          persistent: "Cirugía de liberación del túnel carpiano en casos persistentes."
        }
      }
    ]
  }
};

export default proceduresData;