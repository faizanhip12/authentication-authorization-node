import { TutorialRepository, TutorialModel } from './model'
import asyncHandler from '../../utils/async'



export class TutorialController {

    //   tutorialModel = new TutorialRepository()
    tutorial = new TutorialRepository()
    constructor() { }


    create = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        console.log("body", body)
        // const category = await this.categoryModel.create(body)
        const tutorial = await this.tutorial.create(body)


        console.log("user", tutorial)
        // this.apiResponse.successHandler("",{})
        res.status(200).send({
            success: true,
            message: 'success',
            data: tutorial
        });

    });
    getAll = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
        const { user, body } = req
        // const category = await this.categoryModel.create(body)
        const tutorials =await this.tutorial.findMany()

        console.log("user", tutorials)
        // this.apiResponse.successHandler("",{})
        res.status(200).send({
            success: true,
            message: 'success',
            data: tutorials
        });


        // console.log("user", tutorial)
        // // this.apiResponse.successHandler("",{})
        // res.status(200).send({
        //     success: true,
        //     message: 'success',
        //     data: tutorial
        // });

    });

    //   getAll = asyncHandler(async (req: any, res: Response | any): Promise<Response | void> => {
    //     const { user, body } = req
    //     const categories = await this.categoryModel.findMany()



    //     res.status(200).send({
    //       success: true,
    //       message: 'success',
    //       data: categories
    //     });

    //   });


}