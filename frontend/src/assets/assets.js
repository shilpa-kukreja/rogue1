import p_img1 from './p_img1.png'
import s1 from './s1.jpeg'
import s2 from './s2.png'
import s3 from './s3.jpeg'
import s4 from './s4.png'
import BG from './BG.jpg'

// import p1 from '../assets/ProductImg/productImg1.webp'



// import p1 from './productImg1.webp'
// import p2 from './productImg2.webp'
// import p3 from './productImg3.webp'
// import p4 from './productImg4.webp'
// import p5 from './productImg5.webp'
// import p6 from './productImg6.webp'
// import p7 from './productImg7.webp'

// rotate3d img import 
import rotate2 from './products/rotate2.webp'
import rotate3 from './products/rotate3.webp'
import rotate4 from './products/rotate4.webp'
import rotate5 from './products/rotate5.webp'
import rotate6 from './products/rotate6.webp'
import rotate7 from './products/rotate7.webp'
import rotate8 from './products/rotate8.webp'





import p1 from './products/productImg1.webp'
import p1top from './products/pro1-1.webp'
import p1bottom from './products/pro1-2.webp'
import p1Chart from './products/pro1-chart.webp'

import p2 from './products/productImg2.webp'
import p3 from './products/productImg3.webp'
import p4 from './products/productImg4.webp'
import p5 from './products/productImg5.webp'
import p6 from './products/productImg6.webp'
import p7 from './products/productImg7.webp'
/* rotateImg */

import rotatep1 from './products/rotate-p1.webp'
import rotatep2 from './products/rotate-p2.webp'
import rotatep3 from './products/rotate-p3.webp'
import rotatep4 from './products/rotate-p4.webp'
import rotatep5 from './products/rotate-p5.webp'
import rotatep6 from './products/rotate-p6.webp'
import rotatep7 from './products/rotate-p7.webp'
import rotatep8 from './products/rotate-p8.webp'

import bgImg from './rogue-bg.png'
import animationblackbackground from './animationblackbackground.mp4'
import gif from './gif.gif'
import videogif from './videogif.mov'
import Video from './Video.mp4'
import Finale from './Finale.gif'
import Video1 from './Video1.gif'
import prodcut from './prodcut.gif'
import final1 from './final1.webm'
import final2 from './final2.webm'


export const assets = {
    p_img1,s1,s2,s3,s4,p1,p2,p3,p4,p5,p6,p7,bgImg,p1top,p1bottom,p1Chart ,rotatep1,rotatep2,rotatep3,rotatep4,rotatep5,rotatep6,rotatep7,rotatep8,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8,
    animationblackbackground,gif,videogif,Video,Finale,Video1,prodcut,final1,final2,BG
}

console.log("Product Image 1 Path:", p1);


 export const  products=[
    {
         id:'1',
         name:'product-1',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
         
        rotateImg:[rotatep1],
        image: [p1,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "women",
        date: 1716634345448,
        bestseller: true,
        offer:-12,       
          sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],
         
    },
    
    {
         id:'2',
         name:'product-2',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
        
        rotateImg:[rotatep2],
        image: [p2,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "women",
        
        date: 1716634345448,
        bestseller: true,
        offer:-12,
          sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],

    },
    {
         id:'3',
         name:'product-3',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
     
        rotateImg:[rotatep3],
        image: [p3,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "women",
       
        date: 1716634345448,
        bestseller: true,
        offer:-12,        
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],

    },
    {
         id:'4',
         name:'product-4',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
         
        rotateImg:[rotatep4],
        image: [p4,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "women",
     
        date: 1716634345448,
        bestseller: true,
        offer:-12,        
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],
    },
    {
         id:'5',
         name:'product-5',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
        
        rotateImg:[rotatep5],
        image: [p5,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "men",
        
        date: 1716634345448,
        bestseller: true,
        offer:-12,        
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],
    },
    {
         id:'6',
         name:'product-6',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
      
        rotateImg:[rotatep6],
        image: [p6,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "men",
       
        date: 1716634345448,
        bestseller: true,
        offer:-12,
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],

    },
    {
         id:'7',
         name:'product-7',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
       
        rotateImg:[rotatep7],
        image: [p7,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "men",
        
        date: 1716634345448,
        bestseller: true,
        offer:-12,        
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],
    },
    {
         id:'8',
         name:'product-8',
         shortDescription:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.',
         description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, molestias.",
       
        rotateImg:[rotatep8],
        image: [p4,p1top,p1bottom,p1Chart,rotate2,rotate3,rotate4,rotate5,rotate6,rotate7,rotate8],
        category: "men",
        
        date: 1716634345448,
        bestseller: true,
        offer:-12,        
        sizeChart: [
            { ref: "A", label: "Total Length", XXS: 88, XS: 90, S: 92, M: 94, L: 96, XL: 98, XXL: 100 },
            { ref: "B", label: "Waist Circumference", XXS: 69, XS: 74, S: 79, M: 84, L: 89, XL: 94, XXL: 99 },
            { ref: "C", label: "Hip Circumference", XXS: 76, XS: 81, S: 86, M: 91, L: 96, XL: 101, XXL: 106 },
          ],
          sizesInfo: [
            { size: "XXS", actualPrice: 200, discountPrice: 150, offer: 25 },
            { size: "XS", actualPrice: 220, discountPrice: 170, offer: 23 },
            { size: "S", actualPrice: 230, discountPrice: 180, offer: 22 },
            { size: "M", actualPrice: 250, discountPrice: 190, offer: 20 },
            { size: "L", actualPrice: 270, discountPrice: 200, offer: 18 },
            { size: "XL", actualPrice: 300, discountPrice: 240, offer: 20 },
            { size: "XXL", actualPrice: 320, discountPrice: 260, offer: 19 },
        ],
    },
 ]