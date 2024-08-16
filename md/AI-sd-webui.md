# StableDiffusion WebUI
目录
1. 安装
2. 配置
3. 运行
4. 常见问题
5. 参考资料

## 1. 安装
### windows

### linux

### macos
#### 1. 安装前置软件 
    + 1.1. 安装homebrew
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    + 1.2. 通过brew安装依赖
    ```
    brew install git
    brew install --cask anaconda
    ```
    当然，anaconda也可以选择其他方式安装，比如conda-forge，或者从官网下载shell或dmg进行安装。当前只是进行环境配置，conda就不需要UI界面
    + 1.3. 安装后配置环境变量
    ```
    echo 'export PATH="/usr/local/anaconda3/bin:$PATH" ' >> ~/.zshrc
    source  ~/.zshrc
    conda init zsh
    ```

#### 2. 配置环境
    ``` shell
    # 创建环境，暂时用3.10.6，这个版本才有torch可用
    conda create --name sdwebui python=3.10.6
    # 激活环境
    conda activate sdwebui
    ```
#### 3. 下载SD库
    ``` shell
    # 新建目录【文件名自定义】不能用中文
    mkdir [stable-diffusion-webui]
    cd [stable-diffusion-webui]
    git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
    cd stable-diffusion-webui
    ```
    
#### 4. 运行
    首先根据机器的性能进行参数修改，在`webui-user.sh`中取消第13行注释，也可Copy这段查找`export COMMANDLINE_ARGS=""`，一般`M1`改成下面👇的就可以。 
    ```
    export COMMANDLINE_ARGS="--medvram --opt-split-attention"
    ```
    接下来就可以启动`webui.sh`，注意：要能科学上网！！因为这一步还会安装一些软件库
    ``` 
    ./webui.sh
    ```
    
## 2. 配置
目录结构
```
.
├── CHANGELOG.md
├── CITATION.cff
├── CODEOWNERS
├── LICENSE.txt
├── README.md
├── __pycache__
│   ├── launch.cpython-310.pyc
│   └── webui.cpython-310.pyc
├── _typos.toml
├── cache
│   ├── hashes
│   └── safetensors-metadata
├── config_states
├── configs
│   ├── alt-diffusion-inference.yaml
│   ├── alt-diffusion-m18-inference.yaml
│   ├── instruct-pix2pix.yaml
│   ├── sd_xl_inpaint.yaml
│   ├── v1-inference.yaml
│   └── v1-inpainting-inference.yaml
├── embeddings
│   └── Place Textual Inversion embeddings here.txt
├── environment-wsl2.yaml
├── extensions
│   └── put extensions here.txt
├── extensions-builtin
│   ├── LDSR
│   ├── Lora
│   ├── ScuNET
│   ├── SwinIR
│   ├── canvas-zoom-and-pan
│   ├── extra-options-section
│   ├── hypertile
│   ├── mobile
│   ├── postprocessing-for-training
│   ├── prompt-bracket-checker
│   └── soft-inpainting
├── html
│   ├── card-no-preview.png
│   ├── extra-networks-card.html
│   ├── extra-networks-copy-path-button.html
│   ├── extra-networks-edit-item-button.html
│   ├── extra-networks-metadata-button.html
│   ├── extra-networks-no-cards.html
│   ├── extra-networks-pane-dirs.html
│   ├── extra-networks-pane-tree.html
│   ├── extra-networks-pane.html
│   ├── extra-networks-tree-button.html
│   ├── footer.html
│   └── licenses.html
├── javascript
│   ├── aspectRatioOverlay.js
│   ├── contextMenus.js
│   ├── dragdrop.js
│   ├── edit-attention.js
│   ├── edit-order.js
│   ├── extensions.js
│   ├── extraNetworks.js
│   ├── generationParams.js
│   ├── hints.js
│   ├── hires_fix.js
│   ├── imageMaskFix.js
│   ├── imageviewer.js
│   ├── imageviewerGamepad.js
│   ├── inputAccordion.js
│   ├── localStorage.js
│   ├── localization.js
│   ├── notification.js
│   ├── profilerVisualization.js
│   ├── progressbar.js
│   ├── resizeHandle.js
│   ├── settings.js
│   ├── textualInversion.js
│   ├── token-counters.js
│   ├── ui.js
│   └── ui_settings_hints.js
├── launch.py
├── localizations
│   └── Put localization files here.txt
├── models
│   ├── Codeformer
│   ├── GFPGAN
│   ├── Lora
│   ├── Stable-diffusion
│   ├── VAE
│   ├── VAE-approx
│   ├── deepbooru
│   ├── hypernetworks
│   └── karlo
├── modules
│   ├── Roboto-Regular.ttf
│   ├── __pycache__
│   ├── api
│   ├── cache.py
│   ├── call_queue.py
│   ├── cmd_args.py
│   ├── codeformer_model.py
│   ├── config_states.py
│   ├── dat_model.py
│   ├── deepbooru.py
│   ├── deepbooru_model.py
│   ├── devices.py
│   ├── errors.py
│   ├── esrgan_model.py
│   ├── extensions.py
│   ├── extra_networks.py
│   ├── extra_networks_hypernet.py
│   ├── extras.py
│   ├── face_restoration.py
│   ├── face_restoration_utils.py
│   ├── fifo_lock.py
│   ├── gfpgan_model.py
│   ├── gitpython_hack.py
│   ├── gradio_extensons.py
│   ├── hashes.py
│   ├── hat_model.py
│   ├── hypernetworks
│   ├── images.py
│   ├── img2img.py
│   ├── import_hook.py
│   ├── infotext_utils.py
│   ├── infotext_versions.py
│   ├── initialize.py
│   ├── initialize_util.py
│   ├── interrogate.py
│   ├── launch_utils.py
│   ├── localization.py
│   ├── logging_config.py
│   ├── lowvram.py
│   ├── mac_specific.py
│   ├── masking.py
│   ├── memmon.py
│   ├── modelloader.py
│   ├── models
│   ├── ngrok.py
│   ├── npu_specific.py
│   ├── options.py
│   ├── patches.py
│   ├── paths.py
│   ├── paths_internal.py
│   ├── postprocessing.py
│   ├── processing.py
│   ├── processing_scripts
│   ├── progress.py
│   ├── prompt_parser.py
│   ├── realesrgan_model.py
│   ├── restart.py
│   ├── rng.py
│   ├── rng_philox.py
│   ├── safe.py
│   ├── script_callbacks.py
│   ├── script_loading.py
│   ├── scripts.py
│   ├── scripts_auto_postprocessing.py
│   ├── scripts_postprocessing.py
│   ├── sd_disable_initialization.py
│   ├── sd_emphasis.py
│   ├── sd_hijack.py
│   ├── sd_hijack_checkpoint.py
│   ├── sd_hijack_clip.py
│   ├── sd_hijack_clip_old.py
│   ├── sd_hijack_ip2p.py
│   ├── sd_hijack_open_clip.py
│   ├── sd_hijack_optimizations.py
│   ├── sd_hijack_unet.py
│   ├── sd_hijack_utils.py
│   ├── sd_hijack_xlmr.py
│   ├── sd_models.py
│   ├── sd_models_config.py
│   ├── sd_models_types.py
│   ├── sd_models_xl.py
│   ├── sd_samplers.py
│   ├── sd_samplers_cfg_denoiser.py
│   ├── sd_samplers_common.py
│   ├── sd_samplers_compvis.py
│   ├── sd_samplers_extra.py
│   ├── sd_samplers_kdiffusion.py
│   ├── sd_samplers_lcm.py
│   ├── sd_samplers_timesteps.py
│   ├── sd_samplers_timesteps_impl.py
│   ├── sd_schedulers.py
│   ├── sd_unet.py
│   ├── sd_vae.py
│   ├── sd_vae_approx.py
│   ├── sd_vae_taesd.py
│   ├── shared.py
│   ├── shared_cmd_options.py
│   ├── shared_gradio_themes.py
│   ├── shared_init.py
│   ├── shared_items.py
│   ├── shared_options.py
│   ├── shared_state.py
│   ├── shared_total_tqdm.py
│   ├── styles.py
│   ├── sub_quadratic_attention.py
│   ├── sysinfo.py
│   ├── textual_inversion
│   ├── timer.py
│   ├── torch_utils.py
│   ├── txt2img.py
│   ├── ui.py
│   ├── ui_checkpoint_merger.py
│   ├── ui_common.py
│   ├── ui_components.py
│   ├── ui_extensions.py
│   ├── ui_extra_networks.py
│   ├── ui_extra_networks_checkpoints.py
│   ├── ui_extra_networks_checkpoints_user_metadata.py
│   ├── ui_extra_networks_hypernets.py
│   ├── ui_extra_networks_textual_inversion.py
│   ├── ui_extra_networks_user_metadata.py
│   ├── ui_gradio_extensions.py
│   ├── ui_loadsave.py
│   ├── ui_postprocessing.py
│   ├── ui_prompt_styles.py
│   ├── ui_settings.py
│   ├── ui_tempdir.py
│   ├── ui_toprow.py
│   ├── upscaler.py
│   ├── upscaler_utils.py
│   ├── util.py
│   ├── xlmr.py
│   ├── xlmr_m18.py
│   └── xpu_specific.py
├── package.json
├── pyproject.toml
├── repositories
│   ├── BLIP
│   ├── generative-models
│   ├── k-diffusion
│   ├── stable-diffusion-stability-ai
│   └── stable-diffusion-webui-assets
├── requirements-test.txt
├── requirements.txt
├── requirements_npu.txt
├── requirements_versions.txt
├── screenshot.png
├── script.js
├── scripts
│   ├── __pycache__
│   ├── custom_code.py
│   ├── img2imgalt.py
│   ├── loopback.py
│   ├── outpainting_mk_2.py
│   ├── poor_mans_outpainting.py
│   ├── postprocessing_codeformer.py
│   ├── postprocessing_gfpgan.py
│   ├── postprocessing_upscale.py
│   ├── prompt_matrix.py
│   ├── prompts_from_file.py
│   ├── sd_upscale.py
│   └── xyz_grid.py
├── style.css
├── test
│   ├── __init__.py
│   ├── conftest.py
│   ├── test_extras.py
│   ├── test_face_restorers.py
│   ├── test_files
│   ├── test_img2img.py
│   ├── test_outputs
│   ├── test_torch_utils.py
│   ├── test_txt2img.py
│   └── test_utils.py
├── textual_inversion_templates
│   ├── hypernetwork.txt
│   ├── none.txt
│   ├── style.txt
│   ├── style_filewords.txt
│   ├── subject.txt
│   └── subject_filewords.txt
├── ui-config.json
├── venv
│   ├── bin
│   ├── dev.txt
│   ├── include
│   ├── lib
│   ├── pyvenv.cfg
│   ├── share
│   └── x.txt
├── webui-macos-env.sh
├── webui-user.bat
├── webui-user.sh
├── webui.bat
├── webui.py
└── webui.sh
```
`embeddings` 存放pt后缀的嵌入式向量文件，例如：Easy Negative, bad hands5
模型放入
## 3. 提示词
sd中所有的提示词权重相同，默认为`1`；每个词用英文逗号`,`分隔；提示词可以换行，结尾也需要用英文逗号`,`。但是，在越靠前的词权重会越高，所以，画面将会展示什么，应该先写。注: 超过`75`个词，sd基本不会再理解词的含义，所以，提示词不是越多越好。 

### 推荐的格式：
1. 画质词+画风词 
+ 1.1. 画质词
    ```
    [masterpiece:1.2],best quality, highres, extremely detailed CG,
    perfect lighting, 8k wallpaper,
    ```
    真实系
    ```
    photograph, photorealistic,
    ```
    插画系
    ```
    illustration, comic, game, CG,
    ```
    三维场景
    ```
    3D, C4D render, unreal engine, octane render,
    ```
+ 1.2. 画风词
    ```
    cyberpunk,
    8bit/16bit pixel
    studio ghibli,
    pixel style,
    Chinese ink style
    ……
    ```
2. 画面主体描述 
    ```
    人物、年龄、发型、发色，
    情绪、表情、衣服、装饰，
    正在做什么
    ……
    ```
3. 环境、场景、灯光、构图 
    ```
    阳光明媚的咖啡厅｜下雨天的马路，
    正面｜侧面｜背面，
    人物特写
    ……
    ```
4. Lora
    ```
    加载咯让、hypernetwork等触发内容
    ……
    ```
5. 反向提示词
    反向提示次用来控制AI，避免出现不好的结果。一般分为两种：
    + 5.1. 常见的“不好”的图片特征，例如画质低、品质糟糕、画家签名、模糊、水印，如夏：
    ```
    deformed, lowres, bad anatomy, text, error, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name

    ```
    + 5.2. 不想看到的，不能出现的也可以加入，例如：
    ```
    nsfw, weapon, blood, guro, lowres, bad anatomy, text, error, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts,signature, watermark, username, blurry, artist name

    ```
    一般设置通用的即可，例如：
    ```
    n5FW, (worst quality:2), (low quality:2),(normal quality:2), lowres, normal quality,((monochrome)),((grayscale)), skin spots,acnes, skin blemishes, age spot,(ugly:1.331), (duplicate:1.331),(morbid:1.21), (extra legs:1.331)(fused fingers:1.5), (too many fingers:1.5)(unclear eyes:1.331), lowers, bad handsmissing fingers, extra digit,bad handsmissing fingers, (((extra arms and legs)))
    ```
    另外可以将之保存起来，作为基础预设。
### 提示词符号
| 符号 | 含义 | 例子 | 
| --- | --- | --- | 
| `()` | 增加10%权重 | `(red)`权重1.1，最多3层括号`(((red)))`权重1.331 | 
| `[]` | 减少10%权重 | `[red]`权重0.9，最多3层括号`[[[red]]]`权重0.729 | 
| `{}` | 增加5%权重 | `{red}`权重1.05，最多3层括号`{{{red}}}`权重1.15 | 
| `(prompt:number)` | 提示词`:`权重数值，从0.3～1.5，控制提示词在画面中的比例 | `(red:1.5)` `(green:0.3)` | 
| `<>` | Lora模型使用，<lora:文件触发:权重数值> | `1girl, in hanfu` VS <lora:hanfu:0.6> | 
| `_` | 为了防止模型理解错误，将单词连接为一个意义的词 | `chocolate cake`如果想要的是巧克力蛋糕就应当连起来`chocolate_cake` | 
| `[prompt:number]` | 控制提示词生效时间，数值0～1，整体采样时间到70%后不再采样该词，生成出来的花朵就能多一些 | `[flowers:0.7]` | 
| `[prompt::number]` | 控制提示词生效时间，数值0～1 | `[flowers::0.7]`权重0.7，最多3层括号`[[[red]]]`权重0.729 | 
| `[prompt1:prompt2:number]` | 提示词1和提示词2采样时间比例，控制提示词在画面中的比例，数值0～1，比如例子中的，生成出来以石头为主，花朵点缀的画面 | `[stone:flowers:0.70]` | 
| `[prompt1｜prompt2]` | 提示词1和提示词2交替采样，如例子中的黑白相间的头发 | `1 girl [black｜white] hair` | 
### prompt插件
1. [dynamic prompt](https://github.com/adieyal/sd-dynamic-prmpts)
2. [one button prompt](https://github.com/Airjen/OneButtonPrompt)
3. [prompt-all-in-one](https://github.com/Physton/sd-webui-prompt-all-in-one)
在extension里添加或在github中搜索到直接下载。
## 4. 工作原理
#### 采样器
老派采样器
------------
~~DDIM~~  
~~PLMS~~
Euler  
Euler a  
Heun  
LMS  
LMS Karrs  

DPM采样器
------------
~~DPM2~~  
~~DPM2a~~  
~~DPM++2S a~~  
~~DPM++2S a Karras~~  
~~DPM++2M~~  
DPM++2M Karras  
~~DPM++SDE~~  
DPM++SDE Karras  
~~DPM++2M SDE~~  
DPM++2M SDE Karras   
~~DPM++2M SDE Heun~~  
~~DPM++2M SDE Heun Karras~~  
~~DPM++3M SDE~~  
DPM++3M SDE Karras  
DPM++3M SDE Exponential  
DPM++2M SDE Exponential  
~~DPM2 Karras~~  
~~DPM2 a Karras~~  
~~DPM++2M SDE Heun Exponential~~  
~~DPM fast~~  
~~DPM adaptive~~  

新派采样器
------------
UniPC  
Restart

采样步数
---
一般models采样20步就可以到达80分，高配再做30步以上。采样不能少于10步


## 5. 可用模型
### 真实模型下载
1. [dreamShaper](https://civitai.com/models/4384?modelVersionId=6500) 对标MJ
2. [Deliberate](https://civitai.com/models/5585/deliberate-for-invoke) 各种类型图像
3. [Realistic Vision](https://civitai.com/models/4201?modelVersionId=501240) 各种类型人物，细节拉满
4. [epiCRealism](https://civitai.com/models/25694?modelVersionId=143906) 各种类型人，场景丰富真实的素颜人物
5. [majicMIX realistic](https://civitai.com/models/43331?modelVersionId=176425) 麦橘写实，亚洲审美类型人物，“鲜美”

### 二次元模型下载
1. [GhostMix](https://civitai.com/models/4384?modelVersionId=6500) 训练数据大，无融合Lora，所以对Lora兼容性高
2. [Counterfeit](https://civitai.com/models/5585/deliberate-for-invoke) 简单线条的动漫
3. [MeinaMix](https://civitai.com/models/4201?modelVersionId=501240) 融合了多个模型，无需lora，单通过提示词即可生成优秀的图
4. [万象熔炉 Anything V5/Ink](https://civitai.com/models/25694?modelVersionId=143906) 提示词理解准确，可配合各种lora生成，适合找灵感
5. [ToonYou](https://civitai.com/models/4201?modelVersionId=501240) 欧美画风卡通
Cetus-Mix

完美世界[perfect world]
Sampler Euler a
---
SDXL
[CounterfeitXL](https://civitai.com/models/118406?modelVersionId=265012) 日漫二次元
[SDXL_NIJI_Sepcial Edition](https://civitai.com/models/120765?modelVersionId=154625) 牛逼的二次元
[Anything V5](https://civitai.com/models/120765?modelVersionId=154625)

### 2.5D模型
1. [ReV Animated](https://civitai.com/models/25694?modelVersionId=143906) 全能型模型，Lora兼容性比较好，提示词可以很少，但不更新
2. [RealCrtoon3D](https://civitai.com/models/25694?modelVersionId=143906) 融合模型，产出人物样貌多样，机甲、场景方面表现不错，算得上通用模型，作为上面的替换模型
3. [Dark Sushi 2.5D 大颗寿司2.5D](https://civitai.com/models/25694?modelVersionId=143906) 原来是暗色系图片，现在对人物和二次元场景支持不错
4. [XXMixUnreal](https://civitai.com/models/25694?modelVersionId=143906) 画风个性化， Lora兼容性不太好 
5. [Disney Pixar Cartoon Type A](https://civitai.com/models/4201?modelVersionId=501240) 迪士尼风格，大头、卡通、手办

## 6. 参考资料

1. [StableDiffusion WebUI官方文档](https://github.com/AUTOMATIC1111/stable-diffusion-webui/blob/master/docs/docs.md)