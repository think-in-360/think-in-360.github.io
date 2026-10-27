window.PAPER_DATA = {
  "abstract": "A panoramic video captures all directions around the camera, but relevant evidence can appear in different directions and at different times. Understanding it requires models to connect observations across the viewing sphere and time. We introduce PanoVideoBench, the first manually annotated benchmark for comprehensive panoramic video understanding. Its 1,000 questions span five categories and 15 question types, with diagnostic annotations for target search and panoramic capabilities. Evaluation of 11 proprietary, open-source, and panoramic-specialized models identifies cross-view tracking and sphere-time evidence integration as their weakest capabilities. To strengthen these capabilities, we construct PanoVideoCoT, the first reasoning dataset grounded in real panoramic video, through sphere-time-grounded synthesis that converts verified panoramic observations and successful agentic explorations into 13,465 QA–CoT pairs. Starting from a general video MLLM, PanoVideoReasoner learns from this corpus through Panoramic CoT SFT and Evidence-Privileged On-Policy Self-Distillation, a panoramic instantiation of Vision-OPD's OPSD in which the teacher uses verified perspective views to guide student-generated trajectories. It reaches 55.7% on PanoVideoBench, improving the backbone by 12.5 points and the previous SOTA by 2.6. The gains concentrate on the same spatial, cross-view, and temporal capabilities exposed by the benchmark, showing that grounded sphere-time supervision can equip a general video MLLM with panoramic reasoning.",
  "benchmark": {
    "questions": 1000,
    "videos": 223,
    "hours": "23.06",
    "meanSeconds": 372
  },
  "corpus": {
    "samples": 13465,
    "videos": 2063,
    "hours": 168.8,
    "evidenceNodes": "~100K"
  },
  "results": [
    {
      "model": "Gemini 3.7 Flash",
      "family": "Proprietary",
      "scores": [
        53.1,
        65.7,
        49.5,
        52.4,
        40.9,
        36.5
      ]
    },
    {
      "model": "GPT-5.6-sol",
      "family": "Proprietary",
      "scores": [
        49.6,
        59.9,
        46.0,
        51.9,
        33.5,
        41.9
      ]
    },
    {
      "model": "Gemma-4-31B-it",
      "family": "General-purpose",
      "scores": [
        47.0,
        58.4,
        48.5,
        44.6,
        34.8,
        27.0
      ]
    },
    {
      "model": "Nemotron Omni 30B-A3B",
      "family": "General-purpose",
      "scores": [
        46.3,
        59.9,
        46.0,
        41.6,
        31.1,
        35.1
      ]
    },
    {
      "model": "InternVL3.5-8B",
      "family": "General-purpose",
      "scores": [
        44.9,
        53.8,
        36.1,
        49.4,
        34.1,
        39.2
      ]
    },
    {
      "model": "Qwen3.8-27B",
      "family": "General-purpose",
      "scores": [
        44.8,
        54.7,
        44.1,
        46.8,
        31.1,
        27.0
      ]
    },
    {
      "model": "Qwen3.5-9B",
      "family": "General-purpose",
      "scores": [
        43.2,
        55.4,
        36.6,
        42.5,
        35.4,
        27.0
      ]
    },
    {
      "model": "Eagle2.5-8B",
      "family": "General-purpose",
      "scores": [
        39.6,
        50.5,
        35.6,
        38.6,
        32.3,
        21.6
      ]
    },
    {
      "model": "MiniCPM-V-4.6",
      "family": "General-purpose",
      "scores": [
        39.0,
        48.9,
        37.1,
        34.3,
        34.1,
        25.7
      ]
    },
    {
      "model": "GLM-4.1V-9B-Thinking",
      "family": "General-purpose",
      "scores": [
        38.0,
        46.5,
        38.6,
        32.2,
        31.1,
        32.4
      ]
    },
    {
      "model": "PanoWorld-Hstar",
      "family": "Panoramic",
      "scores": [
        42.9,
        51.7,
        45.0,
        36.5,
        34.1,
        37.8
      ]
    },
    {
      "model": "PanoVideoReasoner",
      "family": "Ours",
      "scores": [
        55.7,
        59.6,
        52.5,
        60.1,
        48.8,
        48.6
      ]
    }
  ],
  "cases": [
    {
      "title": "Motion & orientation",
      "question": "Between 50 and 60 seconds, what is the final orientation and movement direction of the man in the grey hoodie after he turns around?",
      "options": [
        "Facing away from the camera, moving towards the staircase on the left",
        "Facing the camera, moving towards the staircase on the right",
        "Facing away from the camera, moving towards the staircase on the right",
        "Facing the camera, moving towards the staircase on the left"
      ],
      "reasoning": "At around 51 seconds, looking toward the rear of the scene, a man in a grey hoodie is walking across the paved plaza. His back is turned to the camera and his body is angled toward the illuminated staircase set on that rear/left side, with railings and steps clearly ahead of him. From about 53 to 57 seconds he continues turning away from the viewpoint rather than facing back toward us; by roughly 58 to 60 seconds his back is still presented to the camera and he is advancing along the path that leads up to the left-side stairs. There is no clear shift toward the right-hand staircase during this interval, so the motion should not be read as heading to the other stairway. The final orientation is therefore with his back to the camera, moving toward the staircase on the left.",
      "answer": "A. Facing away from the camera and moving toward the left staircase.",
      "baseline": "B. Facing the camera and moving toward the right staircase.",
      "caption": "Maintaining motion and orientation through a turn. The sequence follows the same person from a frontal view through the turn until his back faces the camera and he moves toward the left staircase. PanoVideoReasoner selects A, whereas Qwen3.8-27B reverses both the final orientation and destination.",
      "image": "assets/motion_orientation.webp"
    },
    {
      "title": "Fine-grained recognition",
      "question": "When the man in the dark blue varsity jacket and sunglasses turns to face the camera, what letter is visible on the orange logo on his chest?",
      "options": [
        "The letter P",
        "The letter B",
        "The letter D",
        "The letter O"
      ],
      "reasoning": "At the start of the clip, looking toward the rear-left, the man in the dark blue varsity jacket and sunglasses is bent forward with his back to the camera, so only his jacket sleeve and the gray shoulder panel are visible. Around 25 seconds he straightens up, turns slightly, and by about 30 seconds he is more upright and angled toward the center of the view; shortly after he faces the camera again around 80 seconds and stays mostly in front. When his body is turned so the chest is visible — for instance near 81 to 96 seconds, and clearly on both sides around 145 to 156 seconds when he faces right-to-left — a large orange logo is on the left side of his navy chest. That logo has two closed curves meeting at a point, the upper-right loop closing downward and the lower-left loop curving inward, which is the shape of a D rather than an open P, an O, or a B. The same orange mark repeats on both sides of the stitched panorama, confirming it is his own chest emblem. So the visible letter is D.",
      "answer": "C. The letter D.",
      "baseline": "B. The letter B.",
      "caption": "Confirming a fine detail across panoramic views. The orange chest emblem appears at several times and different ERP positions as the wearer turns. PanoVideoReasoner identifies the repeated mark as D and selects C; Qwen3.8-27B reads it as B at all evaluated input resolutions.",
      "image": "assets/cross_view_detail.webp"
    },
    {
      "title": "Cross-time aggregation",
      "question": "First, observe the group walking toward the building entrance between 2:25 and 2:35. Then, observe the pedestrian in a grey-and-white camouflage jacket between 3:05 and 3:15. What are their final destinations?",
      "options": [
        "Both enter the building",
        "The first group enters; the second remains in front of the entrance",
        "Both remain in front of the entrance",
        "The first group leaves the plaza; the second enters the building"
      ],
      "reasoning": "Looking to the left side of the plaza toward the curved glass-and-wood entrance, the group visible from about 2:25 to 2:35 keeps moving in that direction. By around 2:30 they have reached the doorway and disappear into it rather than turning back or lingering on the open pavement, so their final destination is the building itself. Later, around 3:06, a different pedestrian wearing a grey-and-white camouflage-patterned jacket walks across the foreground and stops just outside the covered entrance; through the following seconds up to about 3:17 they remain standing on the paved area in front of the doors, not crossing inside. The two subjects therefore have different outcomes: the first group enters the building while the camo-jacket pedestrian stays in front of the entrance.",
      "answer": "B. The first group enters; the second remains outside.",
      "baseline": "D. The first group leaves the plaza; the second enters the building.",
      "caption": "Composing outcomes across two distant time windows. The upper sequence tracks the first group through the doorway at 145–153 seconds; the lower sequence shows a different pedestrian remaining outside at 185–193 seconds.",
      "image": "assets/cross_time_destinations.webp"
    }
  ],
  "figures": {
    "teaser.webp": {
      "width": 2600,
      "height": 1589
    },
    "benchmark.webp": {
      "width": 2600,
      "height": 1414
    },
    "dataset.webp": {
      "width": 2600,
      "height": 1039
    },
    "diagnostics.webp": {
      "width": 2600,
      "height": 1383
    }
  }
};
