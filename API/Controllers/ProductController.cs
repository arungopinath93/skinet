// using API.Data;
// using API.Entities;
using Infrastructure.Data;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductRepository _productRepository;
        public ProductController(ILogger<ProductController> logger,IProductRepository productRepository)
        {
            _productRepository = productRepository;
            _logger = logger;
        }
        [HttpGet]
        public async Task<ActionResult<List<Product>>>  GetProducts(){
            var products = await _productRepository.GetProductsAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            return Ok(await _productRepository.GetProductByIdAsync(id));
        }
        [HttpGet("brands")]
        public async Task<ActionResult<IReadOnlyList<ProductBrand>>>  GetProductBarnds(){
            var productBrands = await _productRepository.GetProductBrandsAsync();
            return Ok(productBrands);
        }
       [HttpGet("types")]
        public async Task<ActionResult<IReadOnlyList<ProductType>>>  GetProductTypes(){
            var productTypes = await _productRepository.GetProductTypeAsync();
            return Ok(productTypes);
        }
    }
}