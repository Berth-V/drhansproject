const proceduresData = {
  ankle: {
    title: 'Ankle',
    injuries: [
      {
        id: 'malleolar-fractures',
        name: 'Malleolar Fractures',
        description:
          'Break in one or more of the malleoli (medial, lateral, or posterior).',
        treatment: {
          stable: 'Immobilization with splint or orthopedic boot.',
          displaced: 'Surgery with plates and screws.',
          rehabilitation: 'Postoperative physical therapy rehabilitation.',
        },
      },
      {
        id: 'perimalleolar-ligament-injury',
        name: 'Perimalleolar Ligament Injury',
        description:
          'Damage to ligaments surrounding the ankle due to twisting or accident.',
        treatment: {
          mild: 'RICE method, immobilization and rehabilitation.',
          severe: 'Possible reconstructive surgery for complete ruptures.',
          goal: 'Recover ankle stability.',
        },
      },
      {
        id: 'ankle-cartilage-injury',
        name: 'Ankle Joint Cartilage Injury',
        description:
          'Damage to the articular cartilage, caused by trauma or wear.',
        treatment: {
          mild: 'Physical therapy, anti-inflammatories, PRP or hyaluronic acid.',
          moderate: 'Arthroscopy or hyaluronic acid application.',
          severe: 'Cartilage graft or major surgery.',
        },
      },
      {
        id: 'ankle-syndesmosis-injury',
        name: 'Ankle Syndesmosis Injury',
        description:
          'Separation of the joint between the tibia and fibula, common in athletes.',
        treatment: {
          mild: 'Orthopedic boot and physical therapy.',
          severe: 'Surgery with screws or TightRope systems.',
          note: 'Requires prolonged recovery.',
        },
      },
      {
        id: 'calcaneus-fracture',
        name: 'Calcaneus Fracture',
        description: 'Fracture of the heel bone, common in falls from height.',
        treatment: {
          nonDisplaced: 'Rest and immobilization.',
          displaced: 'Surgery with plates/screws.',
          rehabilitation:
            'Physical therapy to prevent stiffness or post-traumatic arthritis.',
        },
      },
    ],
  },
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
  clavicle: {
    title: 'Clavicle',
    injuries: [
      {
        id: 'clavicle-fracture',
        name: 'Clavicle Fracture',
        description:
          'Common break of the bone between the sternum and shoulder.',
        treatment: {
          nonDisplaced:
            'Immobilization with sling for non-displaced fractures.',
          displaced: 'Surgery with plate and screws for displaced fractures.',
        },
      },
      {
        id: 'acromioclavicular-dislocation',
        name: 'Acromioclavicular Dislocation',
        description:
          'Separation between the clavicle and the acromion (shoulder).',
        treatment: {
          mild: 'Sling, ice, rehabilitation for mild grades.',
          severe: 'Reconstructive surgery with fixation for high grades.',
        },
      },
      {
        id: 'displaced-clavicle-fracture',
        name: 'Displaced Clavicle Fracture',
        description: 'Fracture with separated or overlapped bone ends.',
        treatment: {
          standard: 'Surgery with osteosynthesis to realign the bone.',
        },
      },
      {
        id: 'distal-clavicle-fracture',
        name: 'Distal Clavicle Fracture',
        description:
          'Break in the outer third of the clavicle, near the shoulder.',
        treatment: {
          note: 'High rate of non-union, frequently requires surgery.',
        },
      },
    ],
  },
  elbow: {
    title: 'Elbow',
    injuries: [
      {
        id: 'elbow-dislocation',
        name: 'Elbow Dislocation',
        description: 'Displacement of elbow bones out of alignment.',
        treatment: {
          immediate: 'Immediate manual reduction.',
          followUp: 'Temporary immobilization and physical therapy.',
          severe: 'Surgery if there is severe ligament damage.',
        },
      },
      {
        id: 'epicondylitis',
        name: 'Epicondylitis',
        description:
          "Inflammation of elbow tendons (tennis or golfer's elbow).",
        treatment: {
          standard: 'Physical therapy, anti-inflammatories, splint.',
          chronic: 'Injections or surgery if chronic.',
        },
      },
      {
        id: 'olecranon-fracture',
        name: 'Olecranon Fracture',
        description:
          'Fracture of the posterior end of the ulna, part of the elbow.',
        treatment: {
          nonDisplaced: 'Immobilization for non-displaced fractures.',
          complex: 'Surgery with plate or wire for complex fractures.',
        },
      },
      {
        id: 'supracondylar-humerus-fracture',
        name: 'Supracondylar Humerus Fracture',
        description: 'Fracture above the elbow joint, common in children.',
        treatment: {
          standard: 'Closed or surgical reduction.',
          stabilization: 'Stabilization with pins or plates.',
        },
      },
      {
        id: 'distal-radius-fracture',
        name: 'Distal Radius Fracture',
        description: 'Break near the wrist that can also affect the elbow.',
        treatment: {
          standard: 'Reduction and cast or surgery with plates if displaced.',
        },
      },
      {
        id: 'elbow-arthroscopy',
        name: 'Elbow Arthroscopy',
        description:
          'Minimally invasive surgery to treat internal elbow injuries.',
        treatment: {
          uses: 'Used to remove loose bodies, treat cartilage injuries or chronic inflammation.',
          advantage: 'Faster recovery compared to open surgery.',
        },
      },
    ],
  },
  femur: {
    title: 'Femur',
    injuries: [
      {
        id: 'femoral-diaphysis-fracture',
        name: 'Femoral Diaphysis Fracture',
        description:
          'Break of the long shaft of the femur, usually from severe trauma (accidents, falls).',
        treatment: {
          standard:
            'Almost always surgical: fixation with intramedullary nail.',
          children:
            'In children, sometimes traction + cast if the fracture is not displaced.',
        },
      },
      {
        id: 'femoral-neck-fracture',
        name: 'Femoral Neck Fracture',
        description:
          'Fracture between the femoral head and the shaft of the bone, common in elderly people.',
        treatment: {
          young: 'Fixation with screws in young patients.',
          elderly:
            'Partial replacement (hemiarthroplasty) or total (hip prosthesis) in older adults.',
        },
      },
      {
        id: 'distal-femur-fracture',
        name: 'Distal Femur Fracture',
        description:
          'Break near the knee, affects joint and may be intra-articular.',
        treatment: {
          standard: 'Surgery with plates and screws.',
          rehabilitation: 'Prolonged rehabilitation to recover knee mobility.',
        },
      },
      {
        id: 'periprosthetic-fracture',
        name: 'Periprosthetic Fracture',
        description:
          'Fracture around an already placed hip or knee prosthesis.',
        treatment: {
          evaluation:
            'Careful evaluation: if the prosthesis is stable, it can be fixed with plates or nails.',
          severe: 'In severe cases: complete revision of the prosthesis.',
        },
      },
    ],
  },
  foot: {
    title: 'Foot',
    injuries: [
      {
        id: 'metatarsal-fracture',
        name: 'Metatarsal Fracture',
        description: 'Break in one of the long bones of the forefoot.',
        treatment: {
          nonDisplaced:
            'Immobilization with boot or cast for non-displaced fractures.',
          displaced: 'Surgery with screws or plates for displaced fractures.',
        },
      },
      {
        id: 'bunions',
        name: 'Bunions or Hallux Valgus',
        description:
          'Lateral deviation of the big toe, generates bump at the base of the toe.',
        treatment: {
          initial: 'Insoles, wide shoes, night splints.',
          advanced:
            'Corrective surgery (osteotomy and realignment) for advanced cases.',
        },
      },
      {
        id: 'claw-hammer-toes',
        name: 'Claw or Hammer Toes',
        description:
          'Deformity of the lesser toes, which bend downward or upward.',
        treatment: {
          conservative: 'Orthopedic shoe, exercises and splints.',
          fixed: 'Surgery for fixed deformities.',
        },
      },
      {
        id: 'plantar-fasciitis',
        name: 'Plantar Fasciitis',
        description:
          'Inflammation of the tissue that supports the arch of the foot.',
        treatment: {
          standard:
            'Rest, physical therapy, anti-inflammatories, orthopedic insoles.',
          resistant:
            'Corticosteroid injection or surgical release in resistant cases.',
        },
      },
      {
        id: 'calcaneus-fracture-foot',
        name: 'Calcaneus Fracture',
        description:
          'Fracture of the bone that forms the heel, generally from falling from height.',
        treatment: {
          mild: 'Immobilization for mild cases.',
          displaced: 'Surgery with plate for displaced fractures.',
          rehabilitation: 'Extensive rehabilitation to recover gait.',
        },
      },
      {
        id: 'tarsal-bone-fracture',
        name: 'Tarsal Bone Fracture',
        description: 'Breaks in the small bones of the midfoot.',
        treatment: {
          evaluation: 'Requires detailed radiological study.',
          displaced: 'May require immobilization or surgery if displaced.',
        },
      },
      {
        id: 'flat-foot',
        name: 'Flat Foot',
        description:
          'Collapse of the arch of the foot, congenital or acquired (adult).',
        treatment: {
          mild: 'Orthotic insoles and exercises in mild cases.',
          advanced:
            'Reconstructive surgery if there is persistent pain or advanced deformity.',
        },
      },
    ],
  },
  forearm: {
    title: 'Forearm',
    injuries: [
      {
        id: 'distal-radius-fracture-forearm',
        name: 'Distal Radius Fracture',
        description: 'Break near the wrist, very common after falls.',
        treatment: {
          mild: 'Reduction and immobilization with cast for mild cases.',
          displaced:
            'Surgery with plates and screws for displaced or unstable fractures.',
        },
      },
      {
        id: 'ulna-fracture',
        name: 'Ulna Fracture',
        description:
          'Injury to the medial bone of the forearm, often associated with direct trauma.',
        treatment: {
          simple: 'Splint or cast for simple fractures.',
          complex: 'Surgery for displaced fractures or with joint involvement.',
        },
      },
      {
        id: 'elbow-dislocation-forearm',
        name: 'Elbow Dislocation',
        description: 'Separation of the elbow joint surfaces.',
        treatment: {
          immediate: 'Immediate reduction.',
          followUp: 'Immobilization followed by physical therapy.',
          severe:
            'Surgery if there is associated fracture or recurrent dislocations.',
        },
      },
      {
        id: 'radius-ulna-diaphysis-fracture',
        name: 'Radius or Ulna Diaphysis Fracture',
        description: 'Break in the middle shaft of one or both forearm bones.',
        treatment: {
          standard: 'Generally surgical: internal fixation with plates.',
          children:
            'In children, can sometimes be treated with cast if no displacement.',
        },
      },
      {
        id: 'displaced-radius-fracture',
        name: 'Displaced Radius Fracture',
        description: 'Radius fracture where bone fragments are not aligned.',
        treatment: {
          standard: 'Surgery with open reduction and plate fixation.',
        },
      },
    ],
  },
  hand: {
    title: 'Hand',
    injuries: [
      {
        id: 'carpal-tunnel',
        name: 'Carpal Tunnel Syndrome',
        description:
          'Compression of the median nerve as it passes through the carpal tunnel in the wrist.',
        treatment: {
          conservative:
            'Night wrist braces, anti-inflammatories, physical therapy.',
          severe:
            'Surgical release of the transverse carpal ligament in severe cases.',
        },
      },
      {
        id: 'metacarpal-fracture',
        name: 'Metacarpal Fracture',
        description: 'Break of the long bones of the hand.',
        treatment: {
          mild: 'Splint or cast for mild cases.',
          displaced:
            'Surgery with pins or plates for displaced or unstable fractures.',
        },
      },
      {
        id: 'finger-dislocation',
        name: 'Finger Dislocation',
        description: 'Separation of the bones of a finger joint.',
        treatment: {
          immediate: 'Immediate closed reduction.',
          followUp: 'Brief immobilization and mobility exercises.',
          severe: 'Surgery if unstable or there is ligament injury.',
        },
      },
      {
        id: 'trigger-finger',
        name: 'Trigger Finger or Flexor Tendinitis',
        description:
          'Inflammation that causes the finger to get stuck when bending.',
        treatment: {
          standard: 'Corticosteroid injection, night splints.',
          persistent: "Surgery if it doesn't improve: tendon release.",
        },
      },
      {
        id: 'flexor-extensor-tendon-injury',
        name: 'Flexor or Extensor Tendon Injury',
        description: 'Cut or rupture of tendons that control finger movements.',
        treatment: {
          standard: 'Urgent surgery to repair the tendon.',
          rehabilitation: 'Strict postoperative physical therapy.',
        },
      },
    ],
  },
  hip: {
    title: 'Hip',
    injuries: [
      {
        id: 'femoral-neck-fracture-hip',
        name: 'Femoral Neck Fracture',
        description:
          'Break in the upper part of the femur, just below the femoral head. Frequent in older adults.',
        treatment: {
          young: 'Internal fixation with screws in young patients.',
          elderly: 'Placement of partial or total prosthesis in older adults.',
        },
      },
      {
        id: 'hip-wear',
        name: 'Hip Wear or Osteoarthritis',
        description:
          'Progressive degeneration of the articular cartilage, causes pain and limited movement.',
        treatment: {
          initial: 'Analgesics, physical therapy, weight control.',
          advanced: 'Total hip replacement (prosthesis).',
        },
      },
      {
        id: 'labrum-injury',
        name: 'Labrum or Acetabular Rim Injury',
        description:
          'Damage to the ring of cartilage that surrounds the hip socket.',
        treatment: {
          conservative: 'Physical therapy, medications.',
          persistent: 'Hip arthroscopy to repair or resect the labrum.',
        },
      },
      {
        id: 'hip-dislocation',
        name: 'Hip Dislocation',
        description: 'The femoral head comes out of the acetabular cavity.',
        treatment: {
          standard: 'Urgent reduction under anesthesia.',
          followUp: 'Splint or rest.',
          severe: 'Surgery if there is bone damage or recurrent dislocations.',
        },
      },
      {
        id: 'osteoporosis-hip-fracture',
        name: 'Osteoporosis Hip Fracture',
        description:
          'Non-traumatic or mild trauma fracture in people with low bone density.',
        treatment: {
          standard: 'Surgery (prosthesis or fixation).',
          followUp:
            'Subsequent osteoporosis treatment with medications and diet.',
        },
      },
      {
        id: 'hip-prosthesis',
        name: 'Hip Prosthesis Placement',
        description:
          'Replacement of the damaged joint with a metal or ceramic prosthesis.',
        treatment: {
          indications:
            'Advanced osteoarthritis, complex fractures, avascular necrosis.',
          rehabilitation: 'Fundamental to recover mobility and strength.',
        },
      },
    ],
  },
  humerus: {
    title: 'Humerus',
    injuries: [
      {
        id: 'proximal-humerus-fracture',
        name: 'Proximal Humerus Fracture',
        description:
          'Injury near the shoulder, common in falls in older people.',
        treatment: {
          nonDisplaced: 'Sling and immobilization for non-displaced fractures.',
          displaced:
            'Surgery with plates or nails, or prosthesis if very fragmented.',
        },
      },
      {
        id: 'humerus-diaphysis-fracture',
        name: 'Humerus Diaphysis Fracture',
        description: 'Fracture of the middle shaft of the arm bone.',
        treatment: {
          conservative: 'Conservative with U splint or hanging cast.',
          unstable: 'Surgery in unstable cases: internal fixation.',
        },
      },
      {
        id: 'distal-humerus-fracture',
        name: 'Distal Humerus Fracture',
        description:
          'Break near the elbow, more common in children and older adults.',
        treatment: {
          standard: 'Surgery with plates and screws.',
          rehabilitation: 'Intensive rehabilitation to recover elbow mobility.',
        },
      },
      {
        id: 'radial-nerve-injury',
        name: 'Radial Nerve Injury',
        description:
          'May occur along with humerus fractures; causes weakness in wrist and finger extension.',
        treatment: {
          standard: 'Observation and spontaneous recovery.',
          persistent: 'Surgery if no recovery in weeks/months.',
        },
      },
      {
        id: 'elbow-dislocation-humerus-fracture',
        name: 'Elbow Dislocation with Humerus Fracture',
        description: 'Complex injury with joint and bone compromise.',
        treatment: {
          standard: 'Surgery to realign joints and stabilize fractures.',
          rehabilitation: 'Rehabilitation to prevent stiffness.',
        },
      },
    ],
  },
  knee: {
    title: 'Knee',
    injuries: [
      {
        id: 'knee-dislocation',
        name: 'Knee Dislocation',
        description:
          'Complete displacement of the tibia relative to the femur. Serious injury that can damage ligaments and blood vessels.',
        treatment: {
          immediate: 'Immediate reduction in emergency room.',
          evaluation: 'Vascular evaluation (angiography).',
          severe: 'Surgery to repair ligaments if unstable.',
          rehabilitation: 'Prolonged rehabilitation.',
        },
      },
      {
        id: 'meniscus-injury',
        name: 'Meniscus Injury',
        description:
          'Damage to the cartilages that act as shock absorbers inside the knee.',
        treatment: {
          initial: 'Rest, anti-inflammatories, physical therapy.',
          persistent: 'Arthroscopy for meniscal resection or suture.',
        },
      },
      {
        id: 'patella-fracture',
        name: 'Patella Fracture',
        description:
          'Break of the anterior bone of the knee (patella), generally from direct trauma.',
        treatment: {
          nonDisplaced:
            'Immobilization with splint or cast for non-displaced fractures.',
          displaced: 'Surgery with wire or screws for displaced fractures.',
        },
      },
      {
        id: 'patellofemoral-syndrome',
        name: 'Patellofemoral Syndrome',
        description:
          'Pain in the anterior part of the knee due to abnormal rubbing between the patella and femur.',
        treatment: {
          standard: 'Physical therapy (quadriceps strengthening).',
          activity: 'Activity modification.',
          severe: 'Surgery in severe cases (lateral release or realignment).',
        },
      },
      {
        id: 'total-knee-prosthesis',
        name: 'Total Knee Prosthesis',
        description:
          'Replacement of joint surfaces with metal and plastic components.',
        treatment: {
          indications:
            'Advanced osteoarthritis, severe deformities, chronic disabling pain.',
          rehabilitation: 'Daily physical therapy for weeks or months.',
        },
      },
      {
        id: 'knee-arthroscopy',
        name: 'Knee Arthroscopy',
        description:
          'Minimally invasive surgery to repair intra-articular tissues.',
        treatment: {
          advantages:
            'Less postoperative pain, faster recovery, minimal scars.',
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
    ],
  },
  shoulder: {
    title: 'Shoulder',
    injuries: [
      {
        id: 'rotator-cuff-injury',
        name: 'Rotator Cuff Injury',
        description:
          'Damage to one or more of the tendons that make up the rotator cuff (supraspinatus, infraspinatus, subscapularis and teres minor).',
        treatment: {
          conservative: 'Physical therapy, anti-inflammatories, rest.',
          complete:
            'Surgical: arthroscopic or open repair if there is complete rupture.',
        },
      },
      {
        id: 'shoulder-wear',
        name: 'Shoulder Joint Wear (Glenohumeral Osteoarthritis)',
        description:
          'Progressive degeneration of the cartilage that lines the shoulder joint.',
        treatment: {
          standard: 'Injections, physical therapy, pain control.',
          advanced: 'Total shoulder prosthesis in advanced cases.',
        },
      },
      {
        id: 'proximal-humerus-fracture-shoulder',
        name: 'Proximal Humerus Fracture',
        description:
          'Break in the upper part of the humerus, common in older people after falls.',
        treatment: {
          conservative: 'Conservative with sling, rehabilitation.',
          displaced:
            'Surgery: plates, screws or prosthesis in displaced fractures.',
        },
      },
      {
        id: 'shoulder-dislocation',
        name: 'Shoulder Dislocation',
        description:
          'Exit of the humeral head from the glenoid cavity (anterior dislocation is the most common).',
        treatment: {
          immediate: 'Urgent reduction.',
          rehabilitation: 'Physical therapy for recovery.',
          recurrent:
            'Surgery if there are recurrent dislocations (Bankart repair, remplissage).',
        },
      },
      {
        id: 'clavicle-fracture-shoulder',
        name: 'Clavicle Fracture',
        description:
          'Bone break between the sternum and shoulder, frequent due to trauma.',
        treatment: {
          conservative: 'Conservative with figure-eight bandage.',
          severe:
            'Surgery with plate if there is displacement or severe comminution.',
        },
      },
      {
        id: 'acromion-fracture',
        name: 'Acromion Fracture',
        description:
          'Injury to the bone that forms part of the scapula and roof of the shoulder.',
        treatment: {
          stable: 'Rest, ice, sling if stable.',
          displaced: 'Surgery if there is significant displacement.',
        },
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
    ],
  },
  tibiaFibula: {
    title: 'Tibia & Fibula',
    injuries: [
      {
        id: 'tibia-diaphysis-fracture',
        name: 'Tibia Diaphysis Fracture',
        description:
          'Break in the middle part of the shin bone, usually caused by direct trauma or accidents.',
        treatment: {
          stable: 'Cast or splint for stable fractures.',
          unstable:
            'Internal fixation with intramedullary nails or plates for displaced or unstable fractures.',
        },
      },
      {
        id: 'distal-tibia-fracture',
        name: 'Distal Tibia Fracture',
        description: 'Break near the ankle, may also affect the joint.',
        treatment: {
          nonDisplaced: 'Reduction and cast if not displaced.',
          displaced:
            'Surgery in articular fractures or with displacement (plates and screws).',
        },
      },
      {
        id: 'supracondylar-tibia-fracture',
        name: 'Supracondylar Tibia Fracture',
        description: 'Injury just above the knee joint.',
        treatment: {
          standard: 'Surgical fixation with plates, nails or screws.',
          rehabilitation: 'Postoperative physical therapy to recover mobility.',
        },
      },
      {
        id: 'tibia-stress-fracture',
        name: 'Tibia Stress Fracture',
        description: 'Microfractures caused by overuse, common in athletes.',
        treatment: {
          standard: 'Rest, suspension of physical activity, physical therapy.',
          severe: 'Temporary immobilization or surgery in severe cases.',
        },
      },
    ],
  },
  wrist: {
    title: 'Wrist',
    injuries: [
      {
        id: 'distal-radius-fracture-wrist',
        name: 'Distal Radius Fracture',
        description:
          'The most common wrist fracture, caused by falls on an outstretched hand.',
        treatment: {
          nonDisplaced: 'Cast or splint for non-displaced fractures.',
          displaced:
            'Closed reduction or surgery (plates, pins) for displaced fractures.',
        },
      },
      {
        id: 'wrist-dislocation',
        name: 'Wrist Dislocation',
        description:
          'Abnormal displacement of the carpal bones with respect to the radius or ulna.',
        treatment: {
          standard:
            'Closed or open reduction depending on the degree of injury.',
          stabilization: 'Stabilization with temporary fixators or surgery.',
        },
      },
      {
        id: 'scaphoid-fracture',
        name: 'Scaphoid Fracture',
        description:
          'Break of the scaphoid bone, one of the carpal bones, difficult to diagnose initially.',
        treatment: {
          standard:
            'Prolonged immobilization (due to its slow healing process).',
          surgical:
            'Surgery if there is displacement or non-union (bone graft, cannulated screw).',
        },
      },
      {
        id: 'carpal-bone-fracture',
        name: 'Carpal Bone Fracture',
        description: 'Break of any of the small bones of the wrist.',
        treatment: {
          standard: 'Cast or immobilization.',
          severe: 'Surgery if there are multiple fractures or displacement.',
        },
      },
      {
        id: 'carpal-tunnel-wrist',
        name: 'Carpal Tunnel Syndrome',
        description:
          'Compression of the median nerve in the carpal tunnel, causes numbness and pain in the hand.',
        treatment: {
          conservative: 'Night splints, anti-inflammatories, physical therapy.',
          persistent: 'Carpal tunnel release surgery in persistent cases.',
        },
      },
    ],
  },
};

export default proceduresData;
