import { Request, Response } from "express";
import { Product } from "../entity/Product";
import productSchema from "../schemas/productSchema";

type Previous = {
  page: number;
  limit: number;
}

type Next = {
  page: number;
  limit: number;
}

type Results = {
  next: Next;
  previous: Previous;
  products: Product[];
}


export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({ relations: ["categories"] });
    const page = +req.query.page || 1;
    const limit = +req.query.limit;
    if (!Number.isNaN(page) && !Number.isNaN(limit)) {
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const  results = {} as Results;
      if(startIndex > 0){
        results.previous = {page : page -1 , limit:limit};
      }
      if(endIndex < product.length){
         results.next = {page : page+1, limit : limit};
      }
      results.products = product.slice(startIndex, endIndex);
      return res.json(results);
    } else {
      return res.json(product);
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id: parseInt(id) },
      relations: ["categories"],
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const validate = productSchema.validate(req.body);
    if (!validate.error?.message) {
      let product = new Product();
      product.price = parseInt(req.body.price);
      product = await Product.create({ ...req.body, ...product });
      await product.save();
      return res.json(product);
    } else {
      return res.json({ message: validate.error.message });
    }
  } catch (error) {
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
    if (!validate.error?.message) {
      await Product.update({ id: parseInt(id) }, req.body);
      return res.sendStatus(204);
    } else {
      return res.json({ message: validate.error.message });
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
