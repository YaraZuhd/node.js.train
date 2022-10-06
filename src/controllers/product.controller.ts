import { Request, Response  } from "express";
import { AppDataSource } from "../db";
import { Product } from "../entity/Product";
import productSchema from "../schemas/productSchema";
const userRepository = AppDataSource.getRepository(Product);

export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({relations : ['categories']});    
    return res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params;
    const product = await Product.findOne({ where : {id : parseInt(id)}, relations : ['categories']});

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createProduct = async (
  req: Request,
  res: Response
) => {
  try{
    const product = new Product();
    product.name = req.body.name;
    product.price = parseInt(req.body.price);
    product.desription = req.body.desription;
    product.categories = req.body.categories;
    const validate = productSchema.validate(product);
    if(!validate.error?.message){
      await product.save();
      return res.json(product);
    }else{
      return res.json({message : validate.error.message})
    }
  }catch(error){
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Product.findOneBy({ id: parseInt(id) });
    if (!product) return res.status(404).json({ message: "Product not found" });
    const validate = productSchema.validate(req.body);
    if(!validate.error?.message){
      await Product.update({ id: parseInt(id) }, req.body);
      return res.sendStatus(204);
    }else{
      return res.json({message : validate.error.message})
    }       
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Product.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Product not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};