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

let FilterdProducts: Product[] =  [];

const LIMIT:number = 6


export const getProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({ relations: ["categories"] });
    const page = +req.query.page;
    if (!Number.isNaN(page)) {
      const startIndex = (page - 1) * LIMIT;
      const endIndex = page * LIMIT;
      const  results = {} as Results;
      if(startIndex > 0){
        results.previous = {page : page -1 , limit:LIMIT};
      }
      if(endIndex < product.length){
         results.next = {page : page+1, limit : LIMIT};
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


export const getFilterdProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({ relations: ["categories"] });
    const page = +req.query.page;
    if (!Number.isNaN(page)) {
      const startIndex = (page - 1) * LIMIT;
      const endIndex = page * LIMIT;
      const  results = {} as Results;
      if(startIndex > 0){
        results.previous = {page : page -1 , limit:LIMIT};
      }
      if(endIndex < product.length){
         results.next = {page : page+1, limit : LIMIT};
      }
      results.products = product.slice(startIndex, endIndex);
      console.log(results);
      return res.json(results);
    } 
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const filterProducts = async (req: Request, res: Response) => {
  try {
    const product = await Product.find({ relations: ["categories"] });
    FilterdProducts = []
     if(req.body.categorie !== ""){
      if(req.body.categorie == "Show All"){
        for (let i = 0; i < product.length; i++) {
          FilterdProducts.push(product[i]);
        }
        return res.json(FilterdProducts);
      }else{
            for (let i = 0; i < product.length; i++) {
              for (let j = 0; j < product[i].categories.length; j++) {
                if (
                  product[i].categories[j].name.toLowerCase() ===
                  req.body.categorie.toLowerCase()
                ) {
                  FilterdProducts.push(product[i]);
                }
              }
            }
            return res.json(FilterdProducts);
      }
     }else if (req.body.product !== ""){
      for (let i = 0; i < product.length; i++) {
        if (
          product[i].name.toLowerCase().includes(req.body.product.toLowerCase())
        ) {
          FilterdProducts.push(product[i]);
        }
      }
      return res.json(FilterdProducts);
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
