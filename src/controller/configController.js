const configModel = require("../model/configScheema")




function create2DArray(rows, cols) {
    const symbols = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let array = [];

    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const randomIndex = Math.floor(Math.random() * symbols.length);
            row.push(symbols[randomIndex]);
        }
        array.push(row);
    }
    return array;
}


const createConfig = async(req,res)=>{
    const rows = parseInt(req.query.rows) || 3;
    const cols = parseInt(req.query.cols) || 3;
    const configurationId = req.query.configurationId || 'defaultConfig';

    const array = create2DArray(rows, cols);

    try {
        const existingConfig = await configModel.findOne({ configurationId });
        if (existingConfig) {
            return res.status(400).json({ message: 'Configuration ID already exists' });
        }

        const savedArray = new configModel({ configurationId, data: array });
        await savedArray.save();
        res.status(200).json({ message: 'Array saved successfully', array: array });
    } catch (err) {
        res.status(500).json({ message: 'Error saving array', error: err });
    }
}

const getConfigerationById = async(req,res)=>{
    
    const configurationId = req.params.id;
    
    try {
        const arrayConfig = await configModel.findOne({ configurationId });
     
        if (!arrayConfig) {
            return res.status(404).json({ message: 'Configuration not found' });
        }
        res.status(200).json({message: "Fetch done",data:arrayConfig.data});
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving array', error: err });
    }
}


const insertData = async(req, res)=>{
  
    const sampleConfig = new configModel({
        configurationId: 'qwertyuiop',
        data: [
          ['sym1', 'sym2', 'sym3'],
          ['sym4', 'sym6', 'sym8'],
          ['sym5', 'sym1', 'sym0'],
        ],
      });

      sampleConfig.save()
      return res.status(200).json({message: "Success",})
}

const updateConfigaritionById = async(req,res)=>{
    const { remark } = req.body;

    const cfgId = req.params.id;

    
    try {
        
        const existConfig = await configModel.findOne({configurationId: cfgId})

        if (!existConfig) {
            return res.status(404).json({ message: 'Configuration Id not found' });
        }

        const config = await configModel.findOneAndUpdate(
            { configurationId: req.params.id },
            { remark: remark },
            { new: true }
          );
      
          if (config) {
            res.json({ message: 'Success' });
          } else {
            res.status(404).send('Configuration not found');
          }
      } 
      catch (error) {
        res.status(500).send('Internal Server Error');
      }
}



module.exports.createConfig = createConfig
module.exports.getConfigerationById = getConfigerationById
module.exports.insertData = insertData
module.exports.updateConfigaritionById=updateConfigaritionById