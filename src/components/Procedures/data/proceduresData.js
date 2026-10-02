// English version of proceduresData.es.js: same body parts, injury ids and treatment keys.
const proceduresData = {
  ankle: {
    title: "Ankle",
    injuries: [
      {
        id: "malleolar-fractures",
        name: "Malleolar Fractures",
        description: "Fracture of one or more malleoli (medial, lateral or posterior).",
        treatment: {
          stable: "Immobilization with a splint or walking boot.",
          displaced: "Surgery with plates and screws.",
          rehabilitation: "Postoperative physical therapy."
        }
      },
      {
        id: "perimalleolar-ligament-injury",
        name: "Ankle Ligament Injury",
        description: "Damage to the ligaments around the ankle from a twist or accident.",
        treatment: {
          mild: "RICE method (rest, ice, compression, elevation), immobilization and rehabilitation.",
          severe: "Reconstructive surgery may be needed for a complete tear.",
          goal: "Restore ankle stability."
        }
      },
      {
        id: "ankle-cartilage-injury",
        name: "Ankle Cartilage Injury",
        description: "Damage to the joint cartilage caused by trauma or wear.",
        treatment: {
          mild: "Physical therapy, anti-inflammatories, PRP or hyaluronic acid.",
          moderate: "Arthroscopy or hyaluronic acid injections.",
          severe: "Cartilage graft or major surgery."
        }
      },
      {
        id: "ankle-syndesmosis-injury",
        name: "Ankle Syndesmosis Injury (High Ankle Sprain)",
        description: "Separation of the joint between the tibia and fibula, common in athletes.",
        treatment: {
          mild: "Walking boot and physical therapy.",
          severe: "Surgery with screws or a TightRope system.",
          note: "Requires a long recovery."
        }
      },
      {
        id: "calcaneus-fracture",
        name: "Calcaneus Fracture",
        description: "Fracture of the heel bone, common after falls from a height.",
        treatment: {
          nonDisplaced: "Rest and immobilization.",
          displaced: "Surgery with plates and screws.",
          rehabilitation: "Physical therapy to prevent stiffness or post-traumatic arthritis."
        }
      }
    ]
  },
  cervicalSpine: {
    title: "Cervical Spine",
    injuries: [
      {
        id: "cervical-herniated-disc",
        name: "Cervical Herniated Disc",
        description: "Bulging or rupture of a cervical intervertebral disc that can press on nerve roots.",
        treatment: {
          conservative: "Rest, physical therapy, pain relievers and nerve blocks.",
          severe: "Surgery such as discectomy or fusion in persistent or severe cases."
        }
      },
      {
        id: "neuropathy-radiculopathy",
        name: "Neuropathy or Radiculopathy",
        description: "Compression or inflammation of the cervical nerves causing pain that radiates to the arm.",
        treatment: {
          initial: "Anti-inflammatories, physical therapy and posture control.",
          chronic: "Epidural injections or decompression surgery in chronic cases."
        }
      },
      {
        id: "spondyloarthrosis",
        name: "Cervical Spondylosis",
        description: "Degeneration of the joints between the cervical vertebrae (arthritis).",
        treatment: {
          standard: "Physical therapy and pain medication.",
          severe: "Surgery if there is significant compression of the spinal cord or nerve roots."
        }
      },
      {
        id: "disc-prosthesis",
        name: "Artificial Disc Replacement",
        description: "Replacement of a cervical disc with a mobile prosthesis to preserve motion.",
        treatment: {
          indication: "Surgically indicated for severe disc damage when fusion is not desired."
        }
      },
      {
        id: "vertebral-fusion",
        name: "Spinal Fusion",
        description: "Surgical joining of two or more vertebrae to stabilize the spine.",
        treatment: {
          indication: "Indicated for cervical instability, multiple herniated discs or fractures."
        }
      },
      {
        id: "endoscopic-spine-surgery",
        name: "Endoscopic Cervical Spine Surgery",
        description: "Minimally invasive technique to decompress nerve roots.",
        treatment: {
          advantages: "Faster recovery and less postoperative pain. Indicated for herniated discs and mild to moderate stenosis."
        }
      }
    ]
  },
  clavicle: {
    title: "Clavicle",
    injuries: [
      {
        id: "clavicle-fracture",
        name: "Clavicle Fracture",
        description: "A common fracture of the bone between the breastbone and the shoulder.",
        treatment: {
          nonDisplaced: "Sling immobilization for non-displaced fractures.",
          displaced: "Surgery with a plate and screws for displaced fractures."
        }
      },
      {
        id: "acromioclavicular-dislocation",
        name: "Acromioclavicular (AC) Joint Separation",
        description: "Separation between the clavicle and the acromion (shoulder).",
        treatment: {
          mild: "Sling, ice and rehabilitation for mild grades.",
          severe: "Reconstructive surgery with fixation for high grades."
        }
      },
      {
        id: "displaced-clavicle-fracture",
        name: "Displaced Clavicle Fracture",
        description: "Fracture with bone ends that are separated or overlapping.",
        treatment: {
          standard: "Surgical fixation (osteosynthesis) to realign the bone."
        }
      },
      {
        id: "distal-clavicle-fracture",
        name: "Distal Clavicle Fracture",
        description: "Fracture of the outer third of the clavicle, near the shoulder.",
        treatment: {
          note: "High rate of non-union; often requires surgery."
        }
      }
    ]
  },
  elbow: {
    title: "Elbow",
    injuries: [
      {
        id: "elbow-dislocation",
        name: "Elbow Dislocation",
        description: "The bones of the elbow are forced out of alignment.",
        treatment: {
          immediate: "Immediate manual reduction.",
          followUp: "Temporary immobilization and physical therapy.",
          severe: "Surgery if there is severe ligament damage."
        }
      },
      {
        id: "epicondylitis",
        name: "Epicondylitis",
        description: "Inflammation of the elbow tendons (tennis elbow or golfer's elbow).",
        treatment: {
          standard: "Physical therapy, anti-inflammatories and a brace.",
          chronic: "Injections or surgery if it becomes chronic."
        }
      },
      {
        id: "olecranon-fracture",
        name: "Olecranon Fracture",
        description: "Fracture of the back end of the ulna, the tip of the elbow.",
        treatment: {
          nonDisplaced: "Immobilization for non-displaced fractures.",
          complex: "Surgery with a plate or wires for complex fractures."
        }
      },
      {
        id: "supracondylar-humerus-fracture",
        name: "Supracondylar Humerus Fracture",
        description: "Fracture just above the elbow joint, common in children.",
        treatment: {
          standard: "Closed or surgical reduction.",
          stabilization: "Stabilization with pins or plates."
        }
      },
      {
        id: "distal-radius-fracture",
        name: "Distal Radius Fracture",
        description: "Fracture near the wrist that can also affect the elbow.",
        treatment: {
          standard: "Reduction and a cast, or surgery with plates if displaced."
        }
      },
      {
        id: "elbow-arthroscopy",
        name: "Elbow Arthroscopy",
        description: "Minimally invasive surgery to treat injuries inside the elbow.",
        treatment: {
          uses: "Used to remove loose bodies and treat cartilage injuries or chronic inflammation.",
          advantage: "Faster recovery compared with open surgery."
        }
      }
    ]
  },
  femur: {
    title: "Femur",
    injuries: [
      {
        id: "femoral-diaphysis-fracture",
        name: "Femoral Shaft Fracture",
        description: "Fracture of the long shaft of the femur, usually from severe trauma (accidents, falls).",
        treatment: {
          standard: "Almost always surgical: fixation with an intramedullary nail.",
          children: "In children, traction and a cast are sometimes used if the fracture is not displaced."
        }
      },
      {
        id: "femoral-neck-fracture",
        name: "Femoral Neck Fracture",
        description: "Fracture between the femoral head and the shaft of the bone, common in older adults.",
        treatment: {
          young: "Screw fixation in younger patients.",
          elderly: "Partial (hemiarthroplasty) or total hip replacement in older adults."
        }
      },
      {
        id: "distal-femur-fracture",
        name: "Distal Femur Fracture",
        description: "Fracture near the knee that affects the joint and may extend into it.",
        treatment: {
          standard: "Surgery with plates and screws.",
          rehabilitation: "Extended rehabilitation to recover knee mobility."
        }
      },
      {
        id: "periprosthetic-fracture",
        name: "Periprosthetic Fracture",
        description: "Fracture around an existing hip or knee replacement.",
        treatment: {
          evaluation: "Careful evaluation: if the implant is stable, the fracture can be fixed with plates or nails.",
          severe: "In severe cases, full revision of the joint replacement."
        }
      }
    ]
  },
  foot: {
    title: "Foot",
    injuries: [
      {
        id: "metatarsal-fracture",
        name: "Metatarsal Fracture",
        description: "Fracture of one of the long bones of the forefoot.",
        treatment: {
          nonDisplaced: "Immobilization with a boot or cast for non-displaced fractures.",
          displaced: "Surgery with screws or plates for displaced fractures."
        }
      },
      {
        id: "bunions",
        name: "Bunions (Hallux Valgus)",
        description: "Sideways deviation of the big toe that creates a bump at its base.",
        treatment: {
          initial: "Insoles, wide footwear and night splints.",
          advanced: "Corrective surgery (osteotomy and realignment) for advanced cases."
        }
      },
      {
        id: "claw-hammer-toes",
        name: "Claw Toes or Hammer Toes",
        description: "Deformity of the smaller toes, which bend downward or upward.",
        treatment: {
          conservative: "Orthopedic footwear, exercises and splints.",
          fixed: "Surgery for rigid deformities."
        }
      },
      {
        id: "plantar-fasciitis",
        name: "Plantar Fasciitis",
        description: "Inflammation of the tissue that supports the arch of the foot.",
        treatment: {
          standard: "Rest, physical therapy, anti-inflammatories and orthopedic insoles.",
          resistant: "Corticosteroid injection or surgical release in resistant cases."
        }
      },
      {
        id: "calcaneus-fracture-foot",
        name: "Calcaneus Fracture",
        description: "Fracture of the heel bone, usually from a fall from a height.",
        treatment: {
          mild: "Immobilization in mild cases.",
          displaced: "Surgery with a plate for displaced fractures.",
          rehabilitation: "Extensive rehabilitation to recover walking."
        }
      },
      {
        id: "tarsal-bone-fracture",
        name: "Tarsal Bone Fracture",
        description: "Fractures of the small bones of the midfoot.",
        treatment: {
          evaluation: "Requires detailed imaging studies.",
          displaced: "May require immobilization, or surgery if displaced."
        }
      },
      {
        id: "flat-foot",
        name: "Flat Foot",
        description: "Collapse of the arch of the foot, either congenital or acquired (adult).",
        treatment: {
          mild: "Orthopedic insoles and exercises in mild cases.",
          advanced: "Reconstructive surgery if there is persistent pain or advanced deformity."
        }
      }
    ]
  },
  forearm: {
    title: "Forearm",
    injuries: [
      {
        id: "distal-radius-fracture-forearm",
        name: "Distal Radius Fracture",
        description: "Fracture near the wrist, very common after falls.",
        treatment: {
          mild: "Reduction and cast immobilization for mild cases.",
          displaced: "Surgery with plates and screws for displaced or unstable fractures."
        }
      },
      {
        id: "ulna-fracture",
        name: "Ulna Fracture",
        description: "Injury to the inner bone of the forearm, often from a direct blow.",
        treatment: {
          simple: "Splint or cast for simple fractures.",
          complex: "Surgery for displaced fractures or those involving the joint."
        }
      },
      {
        id: "elbow-dislocation-forearm",
        name: "Elbow Dislocation",
        description: "Separation of the joint surfaces of the elbow.",
        treatment: {
          immediate: "Immediate reduction.",
          followUp: "Immobilization followed by physical therapy.",
          severe: "Surgery if there is an associated fracture or recurrent dislocations."
        }
      },
      {
        id: "radius-ulna-diaphysis-fracture",
        name: "Radius or Ulna Shaft Fracture",
        description: "Fracture in the middle of one or both forearm bones.",
        treatment: {
          standard: "Usually surgical: internal fixation with plates.",
          children: "In children, it can sometimes be treated with a cast if there is no displacement."
        }
      },
      {
        id: "displaced-radius-fracture",
        name: "Displaced Radius Fracture",
        description: "Radius fracture in which the bone fragments are out of alignment.",
        treatment: {
          standard: "Surgery with open reduction and plate fixation."
        }
      }
    ]
  },
  hand: {
    title: "Hand",
    injuries: [
      {
        id: "carpal-tunnel",
        name: "Carpal Tunnel Syndrome",
        description: "Compression of the median nerve as it passes through the carpal tunnel of the wrist.",
        treatment: {
          conservative: "Night splints, anti-inflammatories, physical therapy.",
          severe: "Surgical release of the transverse carpal ligament in severe cases."
        }
      },
      {
        id: "metacarpal-fracture",
        name: "Metacarpal Fracture",
        description: "Fracture of the long bones of the hand.",
        treatment: {
          mild: "Splint or cast for mild cases.",
          displaced: "Surgery with pins or plates for displaced or unstable fractures."
        }
      },
      {
        id: "finger-dislocation",
        name: "Finger Dislocation",
        description: "Separation of the bones of a finger joint.",
        treatment: {
          immediate: "Immediate closed reduction.",
          followUp: "Brief immobilization and range-of-motion exercises.",
          severe: "Surgery if it is unstable or there is a ligament injury."
        }
      },
      {
        id: "trigger-finger",
        name: "Trigger Finger (Flexor Tendinitis)",
        description: "Inflammation that causes the finger to catch or lock when bent.",
        treatment: {
          standard: "Corticosteroid injection and a night splint.",
          persistent: "Surgery if it does not improve: tendon release."
        }
      },
      {
        id: "flexor-extensor-tendon-injury",
        name: "Flexor or Extensor Tendon Injury",
        description: "Cut or rupture of the tendons that move the fingers.",
        treatment: {
          standard: "Urgent surgery to repair the tendon.",
          rehabilitation: "Strict postoperative physical therapy."
        }
      }
    ]
  },
  hip: {
    title: "Hip",
    injuries: [
      {
        id: "femoral-neck-fracture-hip",
        name: "Femoral Neck Fracture",
        description: "Fracture of the upper femur, just below the femoral head. Common in older adults.",
        treatment: {
          young: "Internal fixation with screws in younger patients.",
          elderly: "Partial or total hip replacement in older adults."
        }
      },
      {
        id: "hip-wear",
        name: "Hip Osteoarthritis",
        description: "Progressive wear of the joint cartilage that causes pain and limited movement.",
        treatment: {
          initial: "Pain relievers, physical therapy, weight control.",
          advanced: "Total hip replacement."
        }
      },
      {
        id: "labrum-injury",
        name: "Hip Labral Tear",
        description: "Damage to the ring of cartilage around the hip socket.",
        treatment: {
          conservative: "Physical therapy and medication.",
          persistent: "Hip arthroscopy to repair or trim the labrum."
        }
      },
      {
        id: "hip-dislocation",
        name: "Hip Dislocation",
        description: "The femoral head comes out of the hip socket (acetabulum).",
        treatment: {
          standard: "Urgent reduction under anesthesia.",
          followUp: "Immobilization or rest.",
          severe: "Surgery if there is bone damage or recurrent dislocations."
        }
      },
      {
        id: "osteoporosis-hip-fracture",
        name: "Osteoporotic Hip Fracture",
        description: "Fracture from a minor or no injury in people with low bone density.",
        treatment: {
          standard: "Surgery (joint replacement or fixation).",
          followUp: "Follow-up osteoporosis treatment with medication and diet."
        }
      },
      {
        id: "hip-prosthesis",
        name: "Hip Replacement",
        description: "Replacement of the damaged joint with a metal or ceramic prosthesis.",
        treatment: {
          indications: "Advanced osteoarthritis, complex fractures, avascular necrosis.",
          rehabilitation: "Essential to recover mobility and strength."
        }
      }
    ]
  },
  humerus: {
    title: "Humerus",
    injuries: [
      {
        id: "proximal-humerus-fracture",
        name: "Proximal Humerus Fracture",
        description: "Injury near the shoulder, common in falls among older adults.",
        treatment: {
          nonDisplaced: "Sling and immobilization for non-displaced fractures.",
          displaced: "Surgery with plates or nails, or a shoulder replacement if highly fragmented."
        }
      },
      {
        id: "humerus-diaphysis-fracture",
        name: "Humeral Shaft Fracture",
        description: "Fracture of the middle shaft of the upper arm bone.",
        treatment: {
          conservative: "Non-surgical treatment with a U-shaped splint or hanging cast.",
          unstable: "Surgery for unstable cases: internal fixation."
        }
      },
      {
        id: "distal-humerus-fracture",
        name: "Distal Humerus Fracture",
        description: "Fracture near the elbow, most common in children and older adults.",
        treatment: {
          standard: "Surgery with plates and screws.",
          rehabilitation: "Intensive rehabilitation to recover elbow mobility."
        }
      },
      {
        id: "radial-nerve-injury",
        name: "Radial Nerve Injury",
        description: "Can occur along with humerus fractures; causes weakness when extending the wrist and fingers.",
        treatment: {
          standard: "Observation and spontaneous recovery.",
          persistent: "Surgery if there is no recovery after weeks or months."
        }
      },
      {
        id: "elbow-dislocation-humerus-fracture",
        name: "Elbow Dislocation with Humerus Fracture",
        description: "Complex injury involving both the joint and the bone.",
        treatment: {
          standard: "Surgery to realign the joint and stabilize the fractures.",
          rehabilitation: "Rehabilitation to prevent stiffness."
        }
      }
    ]
  },
  knee: {
    title: "Knee",
    injuries: [
      {
        id: "knee-dislocation",
        name: "Knee Dislocation",
        description: "Complete displacement of the tibia relative to the femur. A serious injury that can damage ligaments and blood vessels.",
        treatment: {
          immediate: "Immediate reduction in the emergency room.",
          evaluation: "Vascular evaluation (angiography).",
          severe: "Surgery to repair the ligaments if the knee is unstable.",
          rehabilitation: "Extended rehabilitation."
        }
      },
      {
        id: "meniscus-injury",
        name: "Meniscus Tear",
        description: "Damage to the cartilage pads that act as shock absorbers inside the knee.",
        treatment: {
          initial: "Rest, anti-inflammatories, physical therapy.",
          persistent: "Arthroscopy to trim or repair the meniscus."
        }
      },
      {
        id: "patella-fracture",
        name: "Patella Fracture",
        description: "Fracture of the kneecap, usually from a direct blow.",
        treatment: {
          nonDisplaced: "Immobilization with a splint or cast for non-displaced fractures.",
          displaced: "Surgery with wires or screws for displaced fractures."
        }
      },
      {
        id: "patellofemoral-syndrome",
        name: "Patellofemoral Pain Syndrome",
        description: "Pain at the front of the knee caused by abnormal rubbing between the kneecap and the femur.",
        treatment: {
          standard: "Physical therapy (quadriceps strengthening).",
          activity: "Activity modification.",
          severe: "Surgery in severe cases (lateral release or realignment)."
        }
      },
      {
        id: "total-knee-prosthesis",
        name: "Total Knee Replacement",
        description: "Replacement of the joint surfaces with metal and plastic components.",
        treatment: {
          indications: "Advanced osteoarthritis, severe deformities, disabling chronic pain.",
          rehabilitation: "Daily physical therapy for weeks or months."
        }
      },
      {
        id: "knee-arthroscopy",
        name: "Knee Arthroscopy",
        description: "Minimally invasive surgery to repair tissues inside the joint.",
        treatment: {
          advantages: "Less postoperative pain, faster recovery, minimal scarring."
        }
      }
    ]
  },
  lumbarSpine: {
    title: "Lumbar Spine",
    injuries: [
      {
        id: "lumbar-vertebral-fracture",
        name: "Lumbar Vertebral Fracture",
        description: "Fracture of a vertebral body, often from falls or accidents.",
        treatment: {
          stable: "Rest and a lumbar brace for stable fractures.",
          unstable: "Surgery (screw fixation) for unstable fractures or those with nerve damage."
        }
      },
      {
        id: "sciatica",
        name: "Sciatica",
        description: "Pain radiating down the leg caused by compression of the sciatic nerve.",
        treatment: {
          standard: "Anti-inflammatory medication and physical therapy.",
          injections: "Epidural injections.",
          severe: "Surgery if severe compression persists."
        }
      },
      {
        id: "herniated-disc",
        name: "Herniated Disc or Disc Degeneration",
        description: "Bulging of an intervertebral disc that compresses nerve roots.",
        treatment: {
          initial: "Initial conservative treatment.",
          refractory: "Discectomy or endoscopic surgery if it does not respond to treatment."
        }
      },
      {
        id: "lumbar-spondyloarthritis",
        name: "Lumbar Spondyloarthritis",
        description: "Chronic inflammation of the spinal joints.",
        treatment: {
          standard: "Anti-inflammatories, physical therapy, and biologic therapy in severe cases."
        }
      },
      {
        id: "spinal-stenosis",
        name: "Spinal Stenosis",
        description: "Narrowing of the spinal canal that compresses the nerves.",
        treatment: {
          conservative: "Non-surgical (physical therapy, pain relievers).",
          severe: "Decompression surgery if there is severe claudication."
        }
      },
      {
        id: "compression-fracture",
        name: "Compression Fracture",
        description: "Collapse of a vertebral body, common with osteoporosis.",
        treatment: {
          standard: "Rest, pain relief and a brace.",
          severe: "Vertebroplasty in cases of intense pain."
        }
      },
      {
        id: "cauda-equina",
        name: "Cauda Equina Syndrome",
        description: "A medical emergency caused by compression of the lumbar nerve roots.",
        treatment: {
          standard: "Immediate surgery to decompress the nerves."
        }
      },
      {
        id: "spinal-fusion",
        name: "Spinal Fusion",
        description: "Surgery to stabilize vertebrae that have lost their alignment or stability.",
        treatment: {
          indications: "Severe instability, deformities, chronic pain.",
          methods: "Bone grafts, screws and rods."
        }
      },
      {
        id: "endoscopic-spine-surgery-lumbar",
        name: "Endoscopic Lumbar Spine Surgery",
        description: "Minimally invasive technique to decompress nerve roots or repair discs.",
        treatment: {
          advantages: "Less bleeding, faster recovery, small scars."
        }
      }
    ]
  },
  shoulder: {
    title: "Shoulder",
    injuries: [
      {
        id: "rotator-cuff-injury",
        name: "Rotator Cuff Tear",
        description: "Damage to one or more of the rotator cuff tendons (supraspinatus, infraspinatus, subscapularis and teres minor).",
        treatment: {
          conservative: "Physical therapy, anti-inflammatories, rest.",
          complete: "Surgery, arthroscopic or open, for a complete tear."
        }
      },
      {
        id: "shoulder-wear",
        name: "Shoulder Osteoarthritis (Glenohumeral Arthritis)",
        description: "Progressive wear of the cartilage lining the shoulder joint.",
        treatment: {
          standard: "Injections, physical therapy, pain management.",
          advanced: "Total shoulder replacement in advanced cases."
        }
      },
      {
        id: "proximal-humerus-fracture-shoulder",
        name: "Proximal Humerus Fracture",
        description: "Fracture of the upper humerus, common in older adults after falls.",
        treatment: {
          conservative: "Non-surgical treatment with a sling and rehabilitation.",
          displaced: "Surgery with plates, screws or a shoulder replacement for displaced fractures."
        }
      },
      {
        id: "shoulder-dislocation",
        name: "Shoulder Dislocation",
        description: "The head of the humerus comes out of the shoulder socket (anterior dislocation is the most common).",
        treatment: {
          immediate: "Urgent reduction.",
          rehabilitation: "Physical therapy for recovery.",
          recurrent: "Surgery for recurrent dislocations (Bankart repair, remplissage)."
        }
      },
      {
        id: "clavicle-fracture-shoulder",
        name: "Clavicle Fracture",
        description: "Fracture of the bone between the breastbone and the shoulder, often from trauma.",
        treatment: {
          conservative: "Non-surgical treatment with a figure-of-eight brace.",
          severe: "Surgery with a plate if the fracture is displaced or severely comminuted."
        }
      },
      {
        id: "acromion-fracture",
        name: "Acromion Fracture",
        description: "Injury to the part of the shoulder blade that forms the roof of the shoulder.",
        treatment: {
          stable: "Rest, ice and a sling if the fracture is stable.",
          displaced: "Surgery if there is significant displacement."
        }
      }
    ]
  },
  thoracicSpine: {
    title: "Thoracic Spine",
    injuries: [
      {
        id: "thoracic-vertebral-fracture",
        name: "Thoracic Vertebral Fracture",
        description: "Fracture of the vertebral bodies in the middle part of the spine.",
        treatment: {
          conservative: "Non-surgical if there is no nerve damage: brace and rest.",
          unstable: "Surgery if the spine is unstable: screw fixation."
        }
      },
      {
        id: "thoracic-vertebrae-dislocation",
        name: "Thoracic Vertebral Dislocation",
        description: "Displacement of the vertebrae, usually caused by high-energy trauma.",
        treatment: {
          standard: "Urgent stabilization.",
          surgical: "Surgery to reduce and fix the vertebrae."
        }
      },
      {
        id: "compression-fracture-thoracic",
        name: "Compression Fracture",
        description: "Partial collapse of a vertebral body, common with osteoporosis.",
        treatment: {
          standard: "Pain management and a thoracolumbar brace.",
          severe: "Vertebroplasty or kyphoplasty in painful cases."
        }
      },
      {
        id: "sternum-fracture",
        name: "Sternum Fracture",
        description: "Fracture of the breastbone, usually from car accidents.",
        treatment: {
          conservative: "Pain relievers and rest.",
          severe: "Surgery if the fracture is displaced or there is risk of lung injury."
        }
      },
      {
        id: "cauda-equina-thoracic",
        name: "Cauda Equina Syndrome",
        description: "Although more common in the lower back, it can occur with high thoracolumbar injuries.",
        treatment: {
          standard: "Urgent decompression surgery."
        }
      }
    ]
  },
  tibiaFibula: {
    title: "Tibia & Fibula",
    injuries: [
      {
        id: "tibia-diaphysis-fracture",
        name: "Tibial Shaft Fracture",
        description: "Fracture of the middle part of the tibia, usually from a direct blow or accident.",
        treatment: {
          stable: "Cast or splint for stable fractures.",
          unstable: "Internal fixation with intramedullary nails or plates for displaced or unstable fractures."
        }
      },
      {
        id: "distal-tibia-fracture",
        name: "Distal Tibia Fracture",
        description: "Fracture near the ankle that may also affect the joint.",
        treatment: {
          nonDisplaced: "Reduction and a cast if there is no displacement.",
          displaced: "Surgery for joint or displaced fractures (plates and screws)."
        }
      },
      {
        id: "supracondylar-tibia-fracture",
        name: "Proximal Tibia Fracture",
        description: "Injury just below the knee joint.",
        treatment: {
          standard: "Surgical fixation with plates, nails or screws.",
          rehabilitation: "Postoperative physical therapy to recover mobility."
        }
      },
      {
        id: "tibia-stress-fracture",
        name: "Tibial Stress Fracture",
        description: "Tiny cracks caused by overuse, common in athletes.",
        treatment: {
          standard: "Rest, stopping physical activity, physical therapy.",
          severe: "Temporary immobilization or surgery in severe cases."
        }
      }
    ]
  },
  wrist: {
    title: "Wrist",
    injuries: [
      {
        id: "distal-radius-fracture-wrist",
        name: "Distal Radius Fracture",
        description: "The most common wrist fracture, caused by falling on an outstretched hand.",
        treatment: {
          nonDisplaced: "Cast or splint for non-displaced fractures.",
          displaced: "Closed reduction or surgery (plates, pins) for displaced fractures."
        }
      },
      {
        id: "wrist-dislocation",
        name: "Wrist Dislocation",
        description: "Abnormal displacement of the carpal bones relative to the radius or ulna.",
        treatment: {
          standard: "Closed or open reduction depending on the severity of the injury.",
          stabilization: "Stabilization with temporary fixation or surgery."
        }
      },
      {
        id: "scaphoid-fracture",
        name: "Scaphoid Fracture",
        description: "Fracture of the scaphoid, one of the carpal bones; it is often hard to diagnose at first.",
        treatment: {
          standard: "Prolonged immobilization (it heals slowly).",
          surgical: "Surgery if it is displaced or does not heal (bone graft, cannulated screw)."
        }
      },
      {
        id: "carpal-bone-fracture",
        name: "Carpal Bone Fracture",
        description: "Fracture of any of the small bones of the wrist.",
        treatment: {
          standard: "Cast or immobilization.",
          severe: "Surgery if there are multiple fractures or displacement."
        }
      },
      {
        id: "carpal-tunnel-wrist",
        name: "Carpal Tunnel Syndrome",
        description: "Compression of the median nerve in the carpal tunnel, causing tingling and pain in the hand.",
        treatment: {
          conservative: "Night splints, anti-inflammatories, physical therapy.",
          persistent: "Carpal tunnel release surgery in persistent cases."
        }
      }
    ]
  }
};

export default proceduresData;
