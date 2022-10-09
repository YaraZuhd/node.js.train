import { Request, Response } from "express";
import { Category } from "../entity/Category";
import { User } from "../entity/User";
import categorySchema from "../schemas/categorySchema";



export const getCategories = async (req: Request, res: Response) => {
  try {
    const category = await Category.find();
    return res.json(category);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } =  req.params;
    const category = await Category.findOneBy({ id: parseInt(id) });

    if (!category) return res.status(404).json({ message: "Category not found" });

    return res.json(category);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createCategory = async (
  req: Request,
  res: Response
) => {
  try{
    const validate = categorySchema.validate(req.body);
    if(!validate.error?.message){
      let category = new Category();
      category = await Category.create({ ...req.body})
      await category.save();
      return res.json(category);
    }else{
      return res.json({message : validate.error.message})
    }
  }catch(error){
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await Category.findOneBy({ id: parseInt(id) });
    if (!category) return res.status(404).json({ message: "Category not found" });
    const validate = categorySchema.validate(req.body);
    if(!validate.error?.message){
      await Category.update({ id: parseInt(id) }, req.body);
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

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await Category.delete({ id: parseInt(id) });

    if (result.affected === 0)
      return res.status(404).json({ message: "Category not found" });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};